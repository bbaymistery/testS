import Head from "next/head";
import Footer from '../../widgets/Footer';
import TopHeader from '../../widgets/TopHeader';

const GlobalLayout = ({
  children,
  title = "BestSushi.az | Bakı Suşi və Asiya Mətbəxi - Sürətli və Pulsuz Çatdırılma",
  keywords = "sushi, suşi, suşi çatdırılma, Bakı suşi, best sushi, Asiya mətbəxi, suşi restoran, nigiri, udon, noodles, tempura, suşi menyu, vegan suşi, suşi roll, çatdırılma suşi",
  description = "BestSushi.az - 2025-ci ildən Bakıda fəaliyyət göstərən, keyfiyyətli suşi və Asiya mətbəxi yeməklərini təzə və sürətli şəkildə çatdıran onlayn suşi restoranıdır."
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="distribution" content="Global" />
        <meta name="copyright" content={`Copyright BestSushi.az/ ${currentYear}. All rights reserved.`} />
        <meta name="googlebot" content="index, follow" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="stylesheet" href="/fontawesomeAll/css/all.min.css" />
      </Head>

      <TopHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default GlobalLayout;
