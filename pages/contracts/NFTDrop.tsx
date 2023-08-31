import React, { useMemo, useState } from "react";
import { ChainId, ConnectWallet, useAddress, useChainId, useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import styles from '../../styles/Card.module.css';

export default function NFTDrop() {
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
    const [primarySaleRecipient, setPrimarySaleRecipient] = useState("")
    const [royaltyFee, setRoyaltyFee] = useState("");
    const [feeRecipient, setFeeRecipient] = useState("");
    const [platformFeeRecipient, setPlatformFeeRecipient] = useState("");
    const link = useMemo(() => `https://thirdweb.com/${chainName}/${contractAddress}`, [chainName, contractAddress]);

    async function deployContract(contractSelected: ContractType, contractProperties: any) {
        if (!address) {
            return;
        }

        try {
            setIsDeploying(true);
            const deployedAddress = await sdk?.deployer.deployBuiltInContract(
                "nft-drop",
                {
                    name: contractName,
                    description: contractDescription,
                    primary_sale_recipient: address,
                    symbol: contractSymbol,
                    platform_fee_basis_points: 500,
                    platform_fee_recipient: address,
                    fee_recipient: address,
                    seller_fee_basis_points: parseInt(royaltyFee),
                }
            );

            if (deployedAddress) {
                setContractAddress(deployedAddress);
            } else {
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
                        <div className={styles.gradientText}>
                            thirdweb
                        </div>
                        <div className={styles.header}>
                            <h1>NFT Drop</h1>
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
                        {/* <h1 className={styles.label}>Primary Sale Recipient</h1>
                        <div className={styles.inputRow}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="0x address where you want royalties to be sent"
                                defaultValue={address}
                                onChange={(e) => setPrimarySaleRecipient(e.target.value)}
                            />
                        </div> */}
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
                                defaultValue={address}
                                onChange={(e) => setFeeRecipient(e.target.value)}
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
                                        platform_fee_recipient: address,
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
                        {/* Show the link once the contract is deployed */}
                        {contractAddress && (
                            <div className={styles.centeredContainer}>
                                <div className={styles.cardOverlay}>
                                    <p>Contract deployed successfully. You can view the contract's dashboard:</p>
                                    <button
                                        onClick={() => {
                                            setContractAddress(""); // Hide the card
                                            const newTab = window.open(link, "_blank"); // Open link in new tab
                                            if (newTab) {
                                                newTab.focus();
                                                router.push('/'); // Redirect to ./
                                            } else {
                                                console.warn("Popup was blocked. You can manually click the link to view the contract.");
                                            }
                                        }}
                                        className={styles.customButton} // Add your button styles
                                    >
                                        View Dashboard
                                    </button>
                                </div>
                            </div>
                        )}
                        <br />
                    </div>
                </>
            )}
        </div>
    );
}