import { useState, useEffect } from "react";
import { ethers } from "ethers";
import multiSig from "./utils/MultiSigWallet.json";

import { SetOwners,Deposits,Submit,Approve,Revoke,Execute } from "./components/index";

import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [currentAccount, setCurrentAccount] = useState("");

  const [account, setAccount] = useState("None");

  const connectWallet = async () => {
    const contractAddress = "0x2865f8360a82F9A098D4FB8541b4565bbC3D42e2";
    const contractABI = multiSig.abi;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        setCurrentAccount(account[0]);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(account);
        setState({ provider, signer, contract });
       

      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    connectWallet();
    }, []);

  // console.log(state);

  return (
    <div>
  {currentAccount === '' ? (
  <button
  className='connect'
  onClick={connectWallet}
  >
  Connect Wallet
  </button>
  ) : (
      <div style={{ height: "100%" }}>
        <div className="container">
          < SetOwners state = {state} />
          < Deposits state = {state} />
          < Submit state = {state} />
          < Approve state = {state} />
          < Revoke state = {state} />
          < Execute state = {state} />

        </div>
      </div>
        )}
    </div>
  );
}

export default App;
