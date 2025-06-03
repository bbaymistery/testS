import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Steps from "../../components/elements/Steps";
import Layout from "../../components/layouts/Layout";
import { parseCookies } from "../../helpers/cokieesFunc";
import { SET_ACTIVELINK_ID } from "../../store/showFieldReducer/showFieldTypes";
import styles from "./styles.module.scss";
import Hero from "../../components/widgets/Hero";

const NewBooking = (props) => {
  let { data, env } = props
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: SET_ACTIVELINK_ID, payload: 1 });
    localStorage.setItem("activeLinkId", JSON.stringify(1))
  }, [dispatch])
  const router = useRouter()

  return (
    <Layout loggedIn={data} pageUrl={router.pathname} title="APL- Agency New Booking Page | Airport Pickups London" >
      <div className={`page ${styles.page}`}>
        <div className={`page_section ${styles.page_section} `}  >
          <div className={`page_section_container ${styles.page_section_container}`}>
            <div className={"steps_div"}>
              <Steps oneIspending={true} />
            </div>
            <Hero env={env} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewBooking;


export async function getServerSideProps({ req, res }) {
  const { cookie } = req.headers;
  const cookies = parseCookies(cookie);

  // Check if the required cookie exists
  const verify = Boolean(cookies["user-id"]);

  if (!verify) {
    // If the cookie doesn't exist, redirect to home page
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If the cookie exists, proceed with rendering the page
  return {
    props: {
      data: verify,
    },
  };
}