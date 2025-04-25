import { useSelector } from "react-redux";
import GlobalLayout from "../components/layouts/GlobalLayout";
import InitialHero from "../components/widgets/InitialHero";
import seoContentByLang from "../components/layouts/seoContent";


export default function Home(props) {
  const {
    params: { language },
  } = useSelector((state) => state.generalActions);

  const { title, keywords, description } = seoContentByLang[language] || seoContentByLang["az"];


  return (
    <GlobalLayout title={title} keywords={keywords} description={description}>
      <InitialHero />
    </GlobalLayout>
  )
}


export async function getServerSideProps({ req, res }) {


  return { props: {} }
}
