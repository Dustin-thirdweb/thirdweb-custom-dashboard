import React, { useState } from "react";
import { ConnectWallet, useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import NFTDrop from "../components/card/NFTDrop";
import EditionDrop from "../components/card/EditionDrop";
import Link from "next/link";

export default function Deploy() {
  const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);


  return (
    <>
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
          <div className={styles.cardGrid}>
              <NFTDrop />
              <EditionDrop />
          </div>
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