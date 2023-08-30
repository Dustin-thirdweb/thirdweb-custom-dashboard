import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
    const address = useAddress();

    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <div className={styles.navLeft}>
                    <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
                        <Image
                            width={135}
                            height={25}
                            src="/logo.png"
                            alt="Thirdweb Logo"
                            className={styles.headerLogo}
                        />
                    </Link>

                    <div className={styles.navMiddle}>
                        
                    </div>
                </div>

                <div className={styles.navRight}>
                    <div className={styles.navConnect}>
                        <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
                    </div>
                </div>
            </nav>
        </div>
    );
}