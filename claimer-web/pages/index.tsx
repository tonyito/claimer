import { Button } from "antd";

import styles from "../styles/Home.module.scss";

const Home = (): JSX.Element => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Claimer landing page</h1>
        <Button>Hello</Button>
      </main>
    </>
  );
};

export default Home;
