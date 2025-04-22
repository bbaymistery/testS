import Head from 'next/head';
import Footer from '../../widgets/Footer';
import TopHeader from '../../widgets/TopHeader';

const GlobalLayout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  let keywords = ""
  let description = ""
  let title = "Bestsushi.az"
  return (
    <>
      <Head>
    
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* <StandardMetaTags currentYear={currentYear} /> */}
        <meta name="distribution" content="Global" />
        <meta name="copyright" content={`Copyright Bestsushi.az/ ${currentYear}. All rights reserved.`} />
        {/* Allow indexing and following links */}
        <meta name="googlebot" content="index, follow" />
        <meta name="robots" content="index, follow" />
        <link rel="stylesheet" href="/fontawesomeAll/css/all.min.css" />

      </Head>
      {/* <Header /> */}
      <TopHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default GlobalLayout;
