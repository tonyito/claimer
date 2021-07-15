import { Button } from "antd";
import { Provider } from "react-redux";

import Layout from "../components/home/layout";
import { store } from "../lib/redux/store";
import styles from "../styles/Home.module.scss";

const Home = (): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <main className={styles.main}>
            <h1 className={styles.title}>Claimer landing page</h1>
            <Button>Hello</Button>
          </main>
        </Layout>
      </Provider>
    </>
  );
};

export default Home;
