import React, { useState } from "react";
import { ConnectWallet, useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { ChainId, ContractType } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import {
  contractsToShowOnDeploy as contracts,
  contractTypeToDisplayNameMapping as nameMapping,
  contractTypeToImageMapping as imageMapping,
} from "../const/contractToDisplayMappings";
import { useRouter } from "next/router";
import NFTDrop from "../components/card/NFTDrop";
import EditionDrop from "../components/card/EditionDrop";

export default function Deploy() {
  const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const chainId = useChainId();
  let chainName = "";
  if (chainId === ChainId.Mumbai) {
    chainName = "mumbai";
  } else if (chainId === ChainId.Polygon) {
    chainName = "polygon";
  } else if (chainId === ChainId.Mainnet) {
    chainName = "ethereum";
  } else if (chainId === ChainId.BinanceSmartChainMainnet) {
    chainName = "binance";
  } else if (chainId === 8453) {
    chainName = "base"
  }

  async function deployContract(contractSelected: ContractType) {
    if (!address || !sdk) {
      return;
    }

    try {
      setIsLoading(true);
      setIsBlurred(true);

      const contractAddress = await sdk.deployer.deployBuiltInContract(
      // @ts-ignore - we're excluding custom contracts from the demo
      contractSelected,
      {
        name: `My ${contractSelected}`,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: `My awesome ${contractSelected} contract`,
        // Recipients are required when trying to deploy a split contract
        recipients: [
          {
            address,
            sharesBps: 100 * 100,
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    setIsLoading(false);
    setIsBlurred(false);

    alert(`Successfully deployed ${contractSelected} at ${contractAddress}`);

    const newTabUrl = `https://thirdweb.com/${chainName}/${contractAddress}`;
    const newTab = window.open(newTabUrl, "_blank");

    if (newTab) {
      newTab.focus();
    }

    router.push(`/`);
  } catch (error) {
    setIsLoading(false);
    setIsBlurred(false);
    console.error("Error deploying contract:", error);
    // Handle error, display error message, etc.
  }
}

  return (
    <>
      {/* Content */}
      <div className={`${styles.container} ${isBlurred ? styles.blurred : ""}`}>

        <h2>What do you want to deploy?</h2>
        <hr className={styles.divider} />
        {!address ? (
          <>
            <p>
              <b>Connect Your Wallet to deploy a contract</b>
            </p>
            <ConnectWallet />
          </>
        ) : (
          <>
          <NFTDrop />
          <EditionDrop />
          </>
        )}
      </div>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
}