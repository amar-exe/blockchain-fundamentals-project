import React, { useEffect, useState } from "react";
import "./App.css";
import Timeline from "./components/Timeline";
import Login from "./components/Login";
import TwitterArtifact from "./contract/Twitter.json";
import useTwitterContract from "./useTwitterContract";
import AdminPanel from "./components/AdminPanel";
import CreateTweet from "./components/CreateTweet";
import AddUsername from "./components/AddUsername";

function App() {
  const contractAddress = "0x077Cd291735f0fC8eC45ca23C77Cc24aE1E4746e";
  const [account, setAccount] = useState<string>();
  const [ownerAddress, setOwnerAddress] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [hasUsername, setHasUsername] = useState<boolean>(true);

  const getOwnerAddress = async () => {
    if (!twitterContract || account) return;

    const ownerAddress = await twitterContract.getOwner();
      setOwnerAddress(() => {
        return ownerAddress;
      });
  };

  useEffect(() => {
    document.title = "Web3 Twitter"
 }, []);

  const getUsername = async () => {
    if (!twitterContract || account) return;

    const username = await twitterContract.getUsername();
      setUsername(() => {
        console.log("ime",username)
        return username;
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

  useEffect(() => {
    if (!twitterContract) return;
    getUsername();
  }, [twitterContract]);

  const checkIfUsernameExists = async () =>{
    if(!twitterContract || account?.length === 0){
      setHasUsername(true);
      console.log("account", account);
      return;
    } 
 
    const hasUsername = await twitterContract.hasUsernameBool(account);
    console.log("has username", hasUsername);
    setHasUsername(() => {
      return hasUsername;
    });
  }

  useEffect(()=>{
    if (!twitterContract) return;
    checkIfUsernameExists();
  },[account])

  

  return (
    <div className="App">
      {(account === ownerAddress && account) && 
      <AdminPanel account={account} tweetContract={twitterContract} />}
      {!hasUsername && <AddUsername account={account} tweetContract={twitterContract} />}
      {(account) && <CreateTweet account={account} tweetContract={twitterContract} />}
      <Login setAccount={setAccount} account={account} />
      <Timeline account={account} tweetContract={twitterContract} />
    </div>
  );
}

export default App;