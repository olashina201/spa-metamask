import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
const provider_options = {}
let web3modal: Web3Modal;
if (typeof window !== 'undefined') {
  web3modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
  })
}



const Home: NextPage = () => {
  const [account, setAccount] = useState("");

  const connect = async () => {
    const provider = await web3modal?.connect()
    const web3 = new Web3(provider)
    const address = await web3.eth.getAccounts();
    if (address.length === 0) {
      console.log("connect an account")
    } else if (address[0] !== account) {
      setAccount(address[0])
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"
        onClick={connect}
      >
        <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          { account === "" ? "Connect Metamask" : `connected to ${account}`}
        </button>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
