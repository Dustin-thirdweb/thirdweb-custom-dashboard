import React, { useState } from "react";
import styles from '../../styles/Card.module.css'
import Link from "next/link";

export default function NFTDrop () {

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.gradientText}>
                    thirdweb
                </div>
                <div className={styles.label}>
                    <h1>NFT Drop</h1>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.description}>
                    <p>The NFT Drop contract is ideal when you want to release a collection of unique NFTs using the ERC721A Standard.</p>
                    <br />
                    <p>It allows you to define a set of conditions called claim phases in a sequence which defines when and how your users can claim an NFT from your drop; including allowlists, release dates, claim limits, and delayed reveals.</p>
                    <br />
                    <p>When you add NFTs to your drop contract, they are not minted at this point. You prepare everything for your users by lazy minting them, so that other wallets can mint them</p>
                    <br />
                    <p>Use Cases & Examples</p>
                    <br />
                    <p>- Release a PFP Collection where each NFT has a different combination of traits</p>
                    <p>- Release NFTs of your artwork, and have your community mint them for a price</p>
                    <p>- Create a restricted-access NFT drop, where only a specified list of wallets can claim NFTs</p>
                    <br />
                </div>
                <Link href="/contracts/NFTDrop" className={styles.buttonLink}>
                    <button className={styles.customButton}>NFT Drop</button>
                </Link>
            </div>
        </div>
    )
}