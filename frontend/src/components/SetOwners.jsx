import React,{useState} from 'react'
import "./SetOwners.css"

const SetOwners = ({state}) => {

const setOwners = async(event) => {
    event.preventDefault();
    const { contract } = state;
    const owners = [document.querySelector("#owners").value];
    const required = document.querySelector("#required").value;

    const str = owners.toString();
    const str_array = str.split(",");

    console.log(str_array)
  
    const approve = await contract.setOwners(str_array, required);
    await approve.wait();
    console.log("set");
}

    return (
        <>
          <div className="container-md">
            <h3>SET OWNERS</h3>
            <form onSubmit={setOwners}>
              <div className="mb-3">
                <label className="form-label">owners : </label>
                <input
                  type="text"
                  className="form-control"
                  id="owners"
                  placeholder="owner accounts"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">required : </label>
                <input
                  type="text"
                  className="form-control"
                  id="required"
                  placeholder="required"
                />
              </div>
              <button
                type="submit"
                className="btn"
              >
                Set OWNERS
              </button>
            </form>
          </div>
        </>
      );
    };
export default SetOwners