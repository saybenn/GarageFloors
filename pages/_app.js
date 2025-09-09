import "../styles/globals.css";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  const layoutProps = Component.layoutProps || {};
  return (
    <Layout {...layoutProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

