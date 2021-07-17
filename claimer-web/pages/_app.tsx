import "../styles/globals.scss";

import type { AppProps } from "next/app";
import Layout from "components/home/layout";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default MyApp;
