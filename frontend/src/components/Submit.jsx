import React,{useState} from 'react'
import "./SetOwners.css"

const Submit = ({state}) => {

    const [id, setId] = useState('')

const submit = async(event) => {
    event.preventDefault();
    const { contract } = state;
    const address = document.querySelector("#address").value;
    const value = document.querySelector("#value").value;
 
   
    const approve = await contract.submit(address, value);
    await approve.wait();
    console.log("done");
}


const get = async (event) => {
    event.preventDefault();

    const { contract } = state;

    contract.on("Submit", (txId) => {
        setId(JSON.stringify(txId.toString()));
        console.log(txId)
      });
  }


    return (
        <>
          <div className="container-md">
            <h3>SUBMIT</h3>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">address : </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="address"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">value : </label>
                <input
                  type="text"
                  className="form-control"
                  id="value"
                  placeholder="value"
                />
              </div>
              <button
                type="submit"
                className="btn"
              >
                submit
              </button>
            </form>
            <form onSubmit={get}>
        <div>
        <button type="submit" className="btn" onClick={get}>get</button>
          <p style={{fontWeight: "bold"}}>
          {`txId : ${id}`}
          </p>

        
        </div>
        </form>
          </div>
        </>
      );
    };
export default Submit