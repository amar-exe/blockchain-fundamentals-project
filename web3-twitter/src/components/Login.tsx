import React from "react";
import { ethers } from "ethers";
import useIsMetaMaskInstalled from "../useIsMetaMaskInstalled";

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
  account?: string;
}

const Login = ({ setAccount, account }: Props) => {
  const isMetaMaskInstalled = useIsMetaMaskInstalled();

  const handleOnConnect = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: string[]) => {
        setAccount(ethers.utils.getAddress(accounts[0]));
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <div className="sidebar">
      {account && (
        <>
          <b>Connected as:</b>
          <br />
          <small>{account}</small>
        </>
      )}
      {!account && (
        <button onClick={handleOnConnect} className="login-button" disabled={!isMetaMaskInstalled}>
          Login using 🦊
        </button>
      )}
      {!isMetaMaskInstalled && <p>Please install MetaMask</p>}
    </div>
  );
};

export default Login;