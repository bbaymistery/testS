import GlobalLayout from "../components/layouts/GlobalLayout";
import InitialHero from "../components/widgets/InitialHero";


export default function Home(props) {
  return (
    <GlobalLayout >
      <InitialHero />
    </GlobalLayout>
  )
}


export async function getServerSideProps({ req, res }) {


  return { props: {} }
}
