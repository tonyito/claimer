import Link from "next/link";

import Layout from "../components/home/layout";
import styles from "../styles/Home.module.scss";

const Home = (): JSX.Element => {
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>Claimer landing page</h1>
      </main>
    </Layout>
  );
};

export default Home;
