import React, { useState } from "react";
import { ethers } from "ethers";
import "./Deposit.css";

const Deposits = ({ state }) => {
  const [sender, setSender] = useState("");
  const [amount, setAmount] = useState("");

  const deposit = async (event) => {
    event.preventDefault();
    const { contract } = state;

    const toWei = (ether) => ethers.utils.parseEther(ether);

    const amount = document.querySelector("#amount").value;

    const wei = toWei(amount);

    const data = { value: wei };

    const approve = await contract.deposit(data);
    await approve.wait();
    console.log("deposited");

  };

  const get = async (event) => {
    event.preventDefault();

    const { contract } = state;

    contract.on("Deposit", (sender, amount) => {
        setSender(JSON.stringify(sender));
        setAmount(JSON.stringify(amount.toString()));
        console.log(sender)
        console.log(amount)
      });
  }

  return (
    <>
      <div className="container-md">
        <h3>DEPOSIT</h3>
        <form onSubmit={deposit}>
          <div className="mb-3">
            <label className="form-label">Amount : </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="amount"
            />
          </div>

          <button type="submit" className="btn">
            deposit
          </button>
        </form>
        <form onSubmit={get}>
        <div>
        <button type="submit" className="btn" onClick={get}>get</button>
          <p style={{fontWeight: "bold"}}>
          {`sender : ${sender}`}
          </p>
          <p style={{fontWeight: "bold"}}>
          {`amount : ${amount}`}
          </p>
        
        </div>
        </form>
      </div>
    </>
  );
};
export default Deposits;
