import React from 'react'
import "./SetOwners.css"

const Revoke = ({state}) => {

const revoke = async(event) => {
    event.preventDefault();
    const { contract } = state;
    const txId = document.querySelector("#txId").value;
 
   
    const approve = await contract.revoke(txId);
    await approve.wait();
    console.log("revoked");
}


    return (
        <>
          <div className="container-md">
            <h3>REVOKE</h3>
            <form onSubmit={revoke}>
              <div className="mb-3">
                <label className="form-label">txId : </label>
                <input
                  type="text"
                  className="form-control"
                  id="txId"
                  placeholder="txId"
                />
              </div>
              <button
                type="submit"
                className="btn"
              >
                revoke
              </button>
            </form>

          </div>
        </>
      );
    };
export default Revoke