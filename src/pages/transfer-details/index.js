import React from 'react'
import InfoModal from '../../components/elements/InfoModal';
import Layout from '../../components/layouts/Layout';
import styles from "./styles.module.scss"
import Steps from '../../components/elements/Steps';
import FlightWaitingTimeContent from '../../components/elements/FlightWaitingTimeContent';
import 'react-phone-input-2/lib/style.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ManualQuotationFlow from './ManualQuotationFlow';
const TransferDetails = (props) => {
    const router = useRouter()
    let { env, data } = props

    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { passengerDetailsStatus, modalInfo, direction, quotations, language, journeyType, }, appData } = state

    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`${styles.tr_details} page`}>
                <div className={`${styles.tr_details_section} page_section`}>
                    <div className={`${styles.tr_details_section_container} page_section_container`}>
                        <div className={"steps_div"}>
                            <Steps threeIspending={true} oneIsDone={true} twoIsDone={true} />
                        </div>

                        <ManualQuotationFlow
                            quotations={quotations}
                            appData={appData}
                            env={env}
                            language={language}
                            reservations={reservations}
                            direction={direction}
                            journeyType={journeyType}
                            passengerDetailsStatus={passengerDetailsStatus}
                        />

                        {modalInfo ? <InfoModal content={<FlightWaitingTimeContent />} /> : <React.Fragment></React.Fragment>}

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default TransferDetails;
export async function getServerSideProps({ req, res }) {

    let verify = req.cookies["user-id"];
    if (req.url === "/transfer-details") {
        return {
            redirect: {
                destination: `/new-booking`,
                permanent: false,
            },
        };
    }
    return {
        props: {
            data: verify,
        },
    };
}
