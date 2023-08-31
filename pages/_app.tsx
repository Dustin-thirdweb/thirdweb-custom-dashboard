import React from "react";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Base, Mumbai, Binance } from "@thirdweb-dev/chains";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      supportedChains={[Ethereum, Polygon, Base, Mumbai, Binance]}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID}>
      <Head>
        <title>thirdweb Custom Dashboard Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="thirdweb example repository to showcase how to use thirdweb's deployer to dynamically deploy any of thirdweb's pre-built smart contracts"
        />
        <meta
          name="keywords"
          content="thirdweb, thirdweb deployer, thirdweb sdk deploy contract, thirdweb sdk, thirdweb react, thirdweb typescript"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
