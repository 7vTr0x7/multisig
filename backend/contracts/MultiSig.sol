// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MultiSigWallet {
   event Deposit(address indexed sender, uint256 amount);
   event Submit(uint256 indexed txId);
   event Approve(address indexed owner, uint256 indexed txId);
   event Revoke(address indexed owner, uint256 indexed txId);
   event Execute(uint256 indexed txId);

   struct Tx{
    address to;
    uint256 value;
    bool executed;
   }

   address[] public owners;
   mapping (address => bool) public isOwner;
   uint256 public required;

   Tx[] public txs;

   // txId => owners => true / false
   mapping (uint256 => mapping (address => bool)) public approved;

   modifier onlyOwner() {
    require(isOwner[msg.sender],"not owner");
    _;
   }

   modifier txExists(uint _txId) {
       require(_txId < txs.length,"tx does not exists");
       _;
   }

   modifier notApproved(uint _txId) {
       require(!approved[_txId][msg.sender],"tx already approved");
       _;
   }

   modifier notExecuted(uint _txId) {
       require(!txs[_txId].executed,"tx already executed");
       _;
   }

   function setOwners(address[] memory _owners,uint256 _required) external {
       require(_owners.length > 0,"owners required");
       require( 
        _required > 0 && _required <= _owners.length,
        "invalid required num of owners"
       );

       for (uint i; i < _owners.length; i++){
        address owner = _owners[i];
        require(owner != address(0),"invalid owner");
        require(!isOwner[owner],"owner is not unique");

        isOwner[owner] = true;
        owners.push(owner);
       }

       required = _required;
   }
   receive() external payable {
     emit Deposit(msg.sender, msg.value);
   }

   function submit(address _to, uint256 _value)  external onlyOwner {
     txs.push(Tx(
        _to,
        _value,
        false
     ));

     emit Submit(txs.length - 1);
   }

   function approve (uint256 _txId) external
    onlyOwner
    txExists(_txId) 
    notApproved(_txId)
    notExecuted(_txId)
   {
      approved[_txId][msg.sender] = true;
      emit Approve(msg.sender, _txId);
   }

   function _getApprovalCount(uint _txId) private view returns (uint count){
            
       for (uint i; i < owners.length; i++) 
       {
           if (approved[_txId][owners[i]]) {
               count += 1;
           }
       }
   }

   function execute(uint _txId) external txExists(_txId) notExecuted(_txId) {
       require(_getApprovalCount(_txId) >= required, "approvals < required");
       Tx storage trans = txs[_txId];

       trans.executed = true;

       (bool success, ) = trans.to.call{value: trans.value}("");

       require(success, " tx failed");

       emit Execute(_txId);
   }

   function revoke(uint _txId) external onlyOwner txExists(_txId) notExecuted(_txId){
       require(approved[_txId][msg.sender], "tx not approved");
       approved[_txId][msg.sender] = false;
       emit Revoke(msg.sender, _txId);
   }
}


