import Head from 'next/head';

export const PageHead = () => {
  return (
    <Head>
      <title>NextJS React SSR</title>
      <meta
        name='description'
        content='a test boilerplate for redux setting pages server-side'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};
