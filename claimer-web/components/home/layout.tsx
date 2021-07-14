import Head from "next/head";

import styles from "../../styles/Home.module.scss";
import { ChildrenProps } from "../../types/reactTypes";

const Layout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Claimer</title>
        <meta name="description" content="Claimer Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <footer className={styles.footer}>
        <span>Claimer Marketplace</span>
      </footer>
    </div>
  );
};

export default Layout;
