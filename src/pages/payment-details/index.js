/* eslint-disable react-hooks/exhaustive-deps */
import Steps from '../../components/elements/Steps';
import Layout from '../../components/layouts/Layout';
import styles from "./styles.module.scss"
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { quotationImagesObjWebp } from '../../constants/quotationImages';
import { getPriceDetailsFromQuotation } from '../../helpers/getPriceDetailsFromQuotation';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import { collectQuotationsAsync } from '../../helpers/getQuotations';
import moment from "moment-timezone";
import PaymentMethods from '../../components/elements/PaymentMethods';
import { useState } from 'react';
import { useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import PaymentPageSummary from '../../components/elements/PaymentPageSummary'

const Payment = (props) => {
    let { env, data } = props

    const router = useRouter()
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, appData, params: { tokenForArchieve, direction, quotations, language, journeyType, selectedCurrency } } = state


    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});


    const dispatch = useDispatch()

    const [confirmation, setConfirmation] = useState(true);

    //passenger landing payment page We need archieveToken
    const fetchArchieveToken = async (params = {}) => {
        // let { stage, } = params

        // const method = "POST"
        // const reservationObj = reservations
        // const url = `${env.apiDomain}/api/v1/sessions/add`;
        // const headers = { "Content-Type": "application/json" }
        // const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage })
        // const response = await fetch(url, { method, body, headers, });
        // const data = await response.json();


    };


    useEffect(() => {
        let hasPriceUpdateWarningShown = false;

        const handleFocus = async () => {
            if (hasPriceUpdateWarningShown) return; // ❗ Alert gösterildiyse tekrar çalışmasın

            const now = moment().tz("Europe/Istanbul");
            console.log("focus");

            for (let index in reservations) {
                const obj = reservations[index];
                const { transferDetails, 'quotation': previousQuotation } = obj;
                const { transferDateTimeString } = transferDetails;

                const transferTime = moment.tz(transferDateTimeString, "YYYY-MM-DD HH:mm", "Europe/Istanbul");

                if (transferTime.isBefore(now)) {
                    alert(`Transfer time for reservation is in the past. Redirecting to home page.`);
                    router.push("/");
                    return;
                } else {
                    const newQuotationsResponse = await collectQuotationsAsync({ reservations, journeyType, env, currencyId: selectedCurrency.currencyId });

                    if (newQuotationsResponse.status === 200) {
                        const newQuotations = newQuotationsResponse.data[index] || {};
                        const newQuotationOptions = (newQuotations || {}).quotationOptions || [];

                        const newQuotation = newQuotationOptions.find(item => item.carId === previousQuotation.carId);

                        if (newQuotation) {
                            let prevQuotationDetails = getPriceDetailsFromQuotation({ 'quotation': previousQuotation }).data || {};
                            let newQuotationDetails = getPriceDetailsFromQuotation({ 'quotation': newQuotation }).data || {};
                            console.log({ prevQuotationDetails, newQuotationDetails });

                            if (newQuotationDetails.price !== prevQuotationDetails.price) {
                                hasPriceUpdateWarningShown = true; // ❗ Alert gösterildi, artık tetiklenmesin
                                alert(appData.words["strPriceUpdatedOnPaymentPage"]);
                                return;
                            }
                        }
                    }
                }
            }
        };

        window.addEventListener("focus", handleFocus);
        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);


    let size = useWindowSize();
    let { width } = size
    // prompt the user if they try and leave with unsaved changes
    useEffect(() => {
        const confirmationMessage = "If you leave the page, all data will be deleted.";
        // This function will be triggered when the user tries to leave the page
        const beforeUnloadHandler = async (e) => {
            // When we click to close the browser
            setTimeout(() => { fetchArchieveToken({ stage: "PLAN_TO_CLOSE_PAYMENT_PAGE" }) }, 10);

            // In case it is cancelled
            if (window.event.cancelable) {
                setTimeout(() => { fetchArchieveToken({ stage: "PAYMENT_PAGE_NOT_CLOSED" }) }, 450);
            }

            if (confirmation) {
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }
        };

        // This function will be triggered when the user tries to navigate to another page
        const beforeRouteHandler = (url) => {

            if (confirmation) {
                if (nexturls.includes(url) || previousUrls.includes(url) || currentUrls.includes(url)) {
                    setConfirmation(false);
                    return;
                } else {
                    setConfirmation(true);
                }

                if (Router.pathname !== url && !confirm(confirmationMessage)) {
                    Router.events.emit("routeChangeError");
                    throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
                }
            }
        };

        // This function is triggered when the user closes the browser or reloads the page
        const handleEndConcert = async () => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const method = "POST";
            const reservationObj = reservations;
            const url = `${env.apiDomain}/api/v1/sessions/add`;
            const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage: "PAYMENT_PAGE_IS_CLOSED" });
            const response = await fetch(url, { method, body, headers, keepalive: true });
            const data = await response.json();
        };
        // Add event listeners to handle the above functions
        window.addEventListener("beforeunload", beforeUnloadHandler);
        window.addEventListener('unload', handleEndConcert);
        Router.events.on("routeChangeStart", beforeRouteHandler);
        // Remove the event listeners when the component is unmounted
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            window.removeEventListener('unload', handleEndConcert);
            Router.events.off("routeChangeStart", beforeRouteHandler);
        };

    }, [confirmation]);

    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`page ${styles.page} ${width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        <div className={"steps_div"}>
                            <Steps fourIspending={true} threeIsDone={true} oneIsDone={true} twoIsDone={true} />
                        </div>
                        <div className={styles.payment_details_section} >
                            {reservations.map((obj, index) => {
                                let { transferDetails, quotation, selectedPickupPoints, selectedDropoffPoints, passengerDetails } = obj
                                let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                                //here will be visible when passenger comes from home page
                                const passengerDetailsConfig = [
                                    {
                                        icon: "fas fa-user",
                                        label: appData.words["appContactUsFormFullname"],
                                        value: passengerDetails.firstname,
                                    },
                                    {
                                        icon: "fas fa-at",
                                        label: appData.words["strEmailAddress"],
                                        value: passengerDetails.email,
                                    },
                                    {
                                        icon: "fas fa-phone",
                                        label: appData.words["appContactUsFormPhone"],
                                        value: `+${passengerDetails.phone}`,
                                    },
                                    {
                                        icon: "fas fa-users",
                                        label: appData.words["strPassengers"],
                                        value: passengersNumber,
                                    },
                                    {
                                        icon: "fas fa-calendar-alt",
                                        label: appData.words["strOn"],
                                        value: splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1"),
                                    },
                                    {
                                        icon: "fas fa-clock",
                                        label: appData.words["strTime"],
                                        value: `${splitedHour} : ${splitedMinute}`,
                                    },
                                    {
                                        icon: "fa-solid fa-road",
                                        label: appData.words["strDistance"],
                                        value: quotations[index]?.distance,
                                    },
                                    {
                                        icon: "fa-solid fa-clock-rotate-left",
                                        label: appData.words["strDuration"],
                                        value: quotations[index]?.duration,
                                    },
                                    {
                                        icon: "fas fa-car",
                                        label: appData.words["carsTransferType"],
                                        value: carObject[quotation.carId]?.name,
                                    },
                                    {
                                        icon: "fa-solid fa-comment",
                                        label: appData.words["strNotes"],
                                        value: specialRequests,
                                    },
                                ];
                                return (
                                    <div key={index}>
                                        <div className={`${styles.main_container}`} >
                                            <div className={styles.left}>
                                                <div className={styles.left_top_title}>
                                                    {index === 0 ? "Your Booking Details" : "Passenger Details for Return Journey"}
                                                </div>
                                                <div className={styles.left_content_of_card}>

                                                    <div className={styles.show_ondestkop}>
                                                        <PaymentPageSummary selectedPickupPoints={selectedPickupPoints} selectedDropoffPoints={selectedDropoffPoints} />
                                                    </div>

                                                    <div className={styles.image_div}>
                                                        <div className={styles.names}>
                                                            <div className={styles.text_1} style={{ textTransform: 'capitalize' }}>
                                                                You selected
                                                            </div>
                                                            <div className={styles.text_2} style={{ textTransform: 'capitalize' }}>
                                                                {carObject[quotation.carId]?.name}
                                                            </div>
                                                        </div>
                                                        <div className={styles.image}>
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={`${quotationImagesObjWebp[quotation?.carId]?.image}`} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.right} id="print_for_email_tour">
                                                <div className={styles.right_top_title}>
                                                    {index === 0 ? appData?.words["strPassengerDetails"] : appData?.words["strReturnJourneyPassengerDetails"]}
                                                </div>

                                                <div className={styles.passenger_details}>
                                                    <div className={styles.card_info}>
                                                        <div className={styles.info}>
                                                            <ul>

                                                                {
                                                                    (passengerDetailsConfig.slice(0, 4)).map((detail, idx) => (
                                                                        // simply we dont add boder bottom for last element of toursPassengerDetailsConfig
                                                                        <li key={idx} >
                                                                            <div className={styles.details}>
                                                                                <div className={`${styles.details_headerr_li} ${direction}`}>
                                                                                    <div className={styles.li_info}>
                                                                                        <i className={detail.icon} aria-hidden="true"></i>
                                                                                        <p className={styles.property}>{detail.label}</p>
                                                                                    </div>
                                                                                    <p className={styles.value}>:{detail.value}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                                {width <= 990 ? <li className={styles.show_onmobile}>
                                                                    <PaymentPageSummary selectedPickupPoints={selectedPickupPoints} selectedDropoffPoints={selectedDropoffPoints} showIcon={true} />
                                                                </li> : <></>}

                                                                {/* name email phone and passengers  here visible */}
                                                                {
                                                                    (passengerDetailsConfig).slice(4).map((detail, idx) => (
                                                                        <li key={idx}>
                                                                            <div className={styles.details}>
                                                                                <div className={`${styles.details_headerr_li} ${direction}`}>
                                                                                    <div className={styles.li_info}>
                                                                                        <i className={detail.icon} aria-hidden="true"></i>
                                                                                        <p className={styles.property}>{detail.label}</p>
                                                                                    </div>
                                                                                    <p className={styles.value}>{`:${detail.value}`}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }



                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* {<PaymentMethods env={env} />} */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Payment;
export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];
    if (req.url === "/payment") {
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
