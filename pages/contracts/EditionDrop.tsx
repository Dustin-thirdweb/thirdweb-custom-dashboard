import React, { useState } from "react";
import { ChainId, ConnectWallet, useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import styles from '../../styles/Card.module.css';

export default function ERC721() {
    const sdk = useSDK();
    const [isDeploying, setIsDeploying] = useState(false);
    const [contractAddress, setContractAddress] = useState<string>(""); // Provide a default empty string
    const router = useRouter();
    const address = useAddress();

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
    } else if (chainId === 13381) {
        chainName = "phoenix";
    } else if (chainId === 8453) {
        chainName = "base";
    }

    const [contractName, setContractName] = useState("");
    const [contractDescription, setContractDescription] = useState("");
    const [contractSymbol, setContractSymbol] = useState("");
    const [royaltyFee, setRoyaltyFee] = useState("");
    const [feeRecipient, setFeeRecipient] = useState("");
    const [plaformFeeRecipient, setPlatformFeeRecipient] = useState("");

    async function deployContract(contractSelected: ContractType, contractProperties: any) {
        if (!address) {
            return;
        }

        try {
            setIsDeploying(true);
            const deployedAddress = await sdk?.deployer.deployBuiltInContract(
                "edition-drop",
                {
                    name: contractName,
                    description: contractDescription,
                    primary_sale_recipient: address,
                    symbol: contractSymbol,
                    platform_fee_basis_points: 500,
                    platform_fee_recipient: plaformFeeRecipient,
                    fee_recipient: feeRecipient,
                    seller_fee_basis_points: parseInt(royaltyFee),
                }
            );

            if (deployedAddress) {
                setContractAddress(deployedAddress);
                const link = `https://thirdweb.com/${chainName}/${deployedAddress}`;
        
                const shouldVisitLink = window.confirm("Contract deployed successfully. Do you want to visit the contract's dashboard?");
        
                if (shouldVisitLink) {
                    const newTab = window.open(link, "_blank");
                    if (newTab) {
                        newTab.focus();
                    } else {
                        console.warn("Popup was blocked. You can manually click the link to view the contract.");
                    }
                }
        
                router.push(`/`);
            }
         else {
                console.error("Deployed address is undefined.");
            }
        } catch (error) {
            console.error("Error deploying contract:", error);
        } finally {
            setIsDeploying(false);
        }
    }

    return (
        <div className={styles.container}>
            {!address ? (
                <>
                    <p className={styles.connectText}><b>Connect Your Wallet to deploy a contract</b></p>
                    <ConnectWallet />
                </>
            ) : (
                <>
                    {isDeploying && <div className={styles.blurOverlay}>
                        <div className={styles.loadingSpinner}></div></div>}
                    <div className={styles.deployCard}>
                        <div className={styles.header}>
                            <h1>Step 1: Set up the project details</h1>
                        </div>
                        <div className={styles.divider}></div>
                        <br />
                        <h1 className={styles.label}>Name</h1>
                        <div className={styles.inputRow}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="What you will call your project"
                                value={contractName}
                                onChange={(e) => setContractName(e.target.value)}
                            />
                        </div>
                        <h1 className={styles.label}>Symbol</h1>
                        <div className={styles.inputRow}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Symbol"
                                value={contractSymbol}
                                onChange={(e) => setContractSymbol(e.target.value)}
                            />
                        </div>
                        <h1 className={styles.label}>Royalty Fee</h1>
                        <div className={styles.inputRow}>
                            <input
                                className={styles.input}
                                type="number"
                                placeholder="150 = 1.5% 500 = 5%"
                                value={royaltyFee}
                                onChange={(e) => setRoyaltyFee(e.target.value)}
                            />
                        </div>
                        <h1 className={styles.label}>Royalty Recipient</h1>
                        <div className={styles.inputRow}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="0x address where you want royalties to be sent"
                                value={feeRecipient}
                                onChange={(e) => setFeeRecipient(e.target.value)}
                            />
                        </div>
                        <h1 className={styles.label}>Platform Fee Recipient</h1>
                        <div className={styles.inputRow}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="0x address where you want royalties to be sent"
                                value={plaformFeeRecipient}
                                onChange={(e) => setPlatformFeeRecipient(e.target.value)}
                            />
                        </div>
                        <h1 className={styles.label}>Project description</h1>
                        <div className={styles.inputContainer}>
                            <textarea
                                className={`${styles.input} ${styles.largeInput}`}
                                placeholder="Project Description"
                                value={contractDescription}
                                onChange={(e) => setContractDescription(e.target.value)}
                            />
                        </div>
                        <div className={styles.header}>
                            <h1>Step 2: Deploy</h1>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.description}>
                            <p>Once you have decided on all the information above, click deploy and you will be prompted to pay the gas fee for the contract deployment.</p>
                            <p>Once deployed, you will be redirected to your contract dashboard via thirdweb! There you will be able to do things such as:</p>
                            <br />
                            <p>- Add project image</p>
                            <p>- Upload your artwork</p>
                            <p>- Set claim phases and allowlists</p>
                            <p>- Control all aspects of the contract for a successful mint!</p>
                        </div>
                        <div className={styles.divider}></div>
                        <button className={styles.customButton}
                            onClick={async () => {
                                setIsDeploying(true);
                                try {
                                    await deployContract("nft-drop", {
                                        name: contractName,
                                        description: contractDescription,
                                        primary_sale_recipient: address,
                                        symbol: contractSymbol,
                                        platform_fee_basis_points: 500,
                                        platform_fee_recipient: "0x7f0EF299BDbCF7418fc03450428F2310Fef101FF",
                                        fee_recipient: address,
                                        seller_fee_basis_points: 100,
                                    });
                                } catch (error) {
                                    console.error("Error deploying contract:", error);
                                } finally {
                                    setIsDeploying(false);
                                }
                            }}
                            disabled={isDeploying}
                        >
                            {isDeploying ? "Deploying..." : "Deploy NFT Drop"}
                        </button>
                        <br />
                    </div>
                </>
            )}
        </div>
    );
}