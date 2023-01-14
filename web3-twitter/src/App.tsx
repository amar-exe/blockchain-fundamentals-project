import React, { useState } from "react";
import "./App.css";
import Timeline from "./components/Timeline";
import Login from "./components/Login";
import TwitterArtifact from "./contract/Twitter.json";
import useTwitterContract from "./useTwitterContract";

function App() {
  const contractAddress = "0xff4b9Cc0cE32496f03Cc5A2Ba8672b1ed32DD655";
  const [account, setAccount] = useState<string>();
  const twitterContract = useTwitterContract(
    contractAddress,
    TwitterArtifact.abi,
    account
  );

  return (
    <div className="App">
      <Login setAccount={setAccount} account={account} />
      <Timeline account={account} tweetContract={twitterContract} />
    </div>
  );
}

export default App;