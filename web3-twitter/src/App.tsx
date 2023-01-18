import React, { useEffect, useState } from "react";
import "./App.css";
import Timeline from "./components/Timeline";
import Login from "./components/Login";
import TwitterArtifact from "./contract/Twitter.json";
import useTwitterContract from "./useTwitterContract";
import AdminPanel from "./components/AdminPanel";
import CreateTweet from "./components/CreateTweet";

function App() {
  const contractAddress = "0xe4FC7009Bc3d32667C1c7F2778548ce878b5A2A3";
  const [account, setAccount] = useState<string>();
  const [ownerAddress, setOwnerAddress] = useState<string>();
  const getOwnerAddress = async () => {
    if (!twitterContract || account) return;

    const ownerAddress = await twitterContract.getOwner();
      setOwnerAddress(() => {
        return ownerAddress;
      });
  };
  
  const twitterContract = useTwitterContract(
    contractAddress,
    TwitterArtifact.abi,
    account
  );

  useEffect(() => {
    if (!twitterContract) return;
    getOwnerAddress();
  }, [twitterContract]);

  return (
    <div className="App">
      <CreateTweet account={account} tweetContract={twitterContract} />
      <Login setAccount={setAccount} account={account} />
      <Timeline account={account} tweetContract={twitterContract} />
      {(account === ownerAddress && account) && 
      <AdminPanel account={account} tweetContract={twitterContract} />}
    </div>
  );
}

export default App;