import React from 'react'
import "./SetOwners.css"

const Execute = ({state}) => {

const execute = async(event) => {
    event.preventDefault();
    const { contract } = state;
    const txId = document.querySelector("#txId").value;
   
    const approve = await contract.execute(txId);
    await approve.wait();
    console.log("executed");
}


    return (
        <>
          <div className="container-md">
            <h3>EXECUTE</h3>
            <form onSubmit={execute}>
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
                execute
              </button>
            </form>

          </div>
        </>
      );
    };
export default Execute