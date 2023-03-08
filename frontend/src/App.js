import { useState, useEffect } from "react";
import { ethers } from "ethers";
import multiSig from "./utils/MultiSigWallet.json";

import { SetOwners } from "./components/index";

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
    const contractAddress = "0xEA296aC46CF4c92a9a48a4A564809681c78C5da8";
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
        {/* <p
          className="text-muted lead "
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          <small className="acc">Connected Account : {account}</small>
        </p> */}
        <div className="container">
          < SetOwners state = {state} />
        </div>
      </div>
        )}
    </div>
  );
}

export default App;
