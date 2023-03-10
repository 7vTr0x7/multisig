import React, { useState } from "react";
import "./SetOwners.css";

const GetCount = ({ state }) => {
  const [count, setCount] = useState("");

  const getCount = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const txID = document.querySelector("#txID").value;

    const approve = await contract._getApprovalCount(txID);
    setCount(JSON.stringify(approve.toString()));
    console.log(JSON.stringify(approve.toString()));
  };


  return (
    <>
      <div className="container-md">
        <h3>GET APPROVAL COUNTS</h3>
        <form onSubmit={getCount}>
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
            get
          </button>
        </form>
        <p>
            {count}
        </p>
      </div>
    </>
  );
};
export default GetCount;
