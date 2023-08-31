import React, { useEffect, useState } from "react";
import { MediaRenderer, useContract, useContractRead } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { contractTypeToDisplayNameMapping } from "../../const/contractToDisplayMappings";
import styles from "../../styles/Home.module.css";

type Props = {};

export default function ContractPage({ }: Props) {
  const router = useRouter();
  const { contractType, contractAddress } = router.query;

  const { contract } = useContract(contractAddress as string);
  const { data: contractUri, isLoading: uriLoading } = useContractRead(contract, "contractURI", []);

  const [contractMetadata, setContractMetadata] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [metadataLoading, setMetadataLoading] = useState(true);

  useEffect(() => {
    if (contractUri && contractUri.startsWith("ipfs://")) {
      fetch(contractUri.replace("ipfs://", "https://ipfs.io/ipfs/"))
        .then(response => response.json())
        .then(metadata => {
          setContractMetadata({
            name: metadata.name || "",
            description: metadata.description || "",
            image: metadata.image || "",
          });
          setMetadataLoading(false);
        })
        .catch(error => {
          console.error("Error fetching contract metadata:", error);
          setMetadataLoading(false);
        });
    } else {
      setMetadataLoading(false);
    }
  }, [contractUri]);

  return (
    <div className={styles.container}>
      <h1>
        {contractTypeToDisplayNameMapping[contractType as ContractType]}
      </h1>

      <div className={styles.metadataBox}>
        {metadataLoading ? (
          <p>Loading metadata...</p>
        ) : (
          <div className={styles.metadataRow}>
            <div className={styles.metadataImage}>
              <MediaRenderer src={contractMetadata.image} className={styles.collectionImage} />
            </div>
            <div className={styles.metadataText}>
              <h1>{contractMetadata.name}</h1>
              <div className={styles.contractAddress}>
                {contractAddress}
              </div>
              <div className={styles.functionBox}>
              <p>{contractMetadata.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      <h2>Functions:</h2>

      <div className={styles.functionBoxGrid}>
        {!contract
          ? null
          : Object.entries(contract).map(([functionName, functionData]) => (
            <div className={styles.functionBox} key={functionName}>
              <h3>{functionName}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
