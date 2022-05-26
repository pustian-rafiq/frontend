import Head from "next/head";

const Title = ({ children }) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

      <title>{children}</title>
    </Head>
  );
};

export default Title;
