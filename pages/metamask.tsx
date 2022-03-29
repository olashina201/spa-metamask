import React, { useEffect, useState } from "react";

function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected: any) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected: any) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}


export default function MetaMaskAuth({ onAddressChanged }: any) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
    <div>
      Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
     <Connect setUserAddress={setUserAddress}/>
  );
}


function Connect({ setUserAddress }: any) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
         <button>
           Connect to MetaMask
         </button>
      </a>
    );
  }

  
  return (
    <button onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


function Address({ userAddress }: any) {
  return (
    <span>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}