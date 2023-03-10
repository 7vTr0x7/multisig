import React, { useState } from "react";
import "./SetOwners.css";

const Approve = ({ state }) => {
 

  const approved = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const txID = document.querySelector("#txID").value;

    const approval = await contract.approve(txID);
    await approval.wait();
    console.log("approved");
  };

  
   
   return (
    <>
      <div className="container-md">
        <h3>APPROVE</h3>
        <form onSubmit={approved}>
          <div className="mb-3">
            <label className="form-label">txID : </label>
            <input
              type="text"
              className="form-control"
              id="txID"
              placeholder="txID"
            />
          </div>
          <button type="submit" className="btn">
            approve
          </button>
        </form>
      </div>
    </>
  );
  };
export default Approve;
