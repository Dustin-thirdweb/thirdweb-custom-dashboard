import React, { useState } from "react";
import styles from '../../styles/Card.module.css'
import Link from "next/link";

export default function EditionDrop() {

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.gradientText}>
                    thirdweb
                </div>
                <div className={styles.label}>
                    <h1>Edition Drop</h1>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.description}>
                    <p>The Edition Drop contract is best used when you want to release many NFTs based on the same asset and uses the ERC1155 Standard, also known as "Semi-Fungible Tokens"</p>
                    <br />
                    <p>The Edition Drop contract allows you to define the conditions for when and how your users can mint an NFT, including allowlists, release dates, and claim limits.</p>
                    <br />
                    <p>Use Cases & Examples</p>
                    <br />
                    <p>- Create NFT Memberships such as our Early Access Cards that you want your users to claim</p>
                    <p>- Release an item in your game for a limited-time</p>
                    <p>- Create 100 NFTs based on one art piece, and allow users to claim one per wallet</p>
                    <br />
                </div>
                <br />
                <Link href="/contracts/EditionDrop" className={styles.buttonLink}>
                    <button className={styles.customButton}>Edition Drop</button>
                </Link>
            </div>
        </div>
    )
}