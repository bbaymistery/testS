import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Steps from '../../components/elements/Steps/index';
import Layout from '../../components/layouts/Layout';
import { reservationSchemeValidator } from '../../helpers/reservationSchemeValidator';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import { getWindowDimensions } from '../../helpers/windowDimension';
import styles from "./styles.module.scss";
import { normalizeReservations } from '../../helpers/normalizeReservations.js'
import { readyToCollectQuotationOptions } from '../../helpers/readyToCollectQuotationOptions.js'
import { BUTTON_TYPES } from '../../components/elements/Button/ButtonTypes.js'
import Button from '../../components/elements/Button/Button.js'
import Map from './Map.js';
import QuotationHourMinute from './QuotationHourMinute.js'
import QuotationInputDate from './QuotationInputDate.js'
import QuotatıonInputHandleComponent from './QuotatıonInputHandler.js'
import CardQuotationItem from '../../components/elements/CardQuotationItem'


const Quotation = (props) => {
    let { data, env } = props
    const router = useRouter()
    const dispatch = useDispatch()
    const didMountRef = useRef(false);
    const reservationsRef = useRef(reservations);

    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params, appData } = state
    let { sessionToken: reducerSessionToken, journeyType, direction, language, quotations, selectedCurrency } = params


    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


    let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
        'pickup-search-value-0': '',
        'dropoff-search-value-0': '',
        'pickup-search-value-1': '',
        'dropoff-search-value-1': '',
        'collecting-pickup-points-0': [],
        'collecting-dropoff-points-0': [],
        'collecting-pickup-points-1': [],
        'collecting-dropoff-points-1': [],
        'pickup-search-loading-0': false,
        'dropoff-search-loading-0': false,
        'pickup-search-loading-1': false,
        'dropoff-search-loading-1': false,
        'show-pickup-extra-point-0': true,
        'show-dropoff-extra-point-0': true,
        'show-pickup-extra-point-1': true,
        'show-dropoff-extra-point-1': true,
        //quotation loading
        "quotation-loading": false,
        'errorHolder': [],
        "error-booking-message-0": "",
        "error-booking-message-1": "",

    })

    //it is valid when our journey is both way
    const gotoTransferDetailsClick = () => {
        let { quotation: transferQuotation } = reservations[0]
        let { quotation: returnQuotation } = reservations[1]
        //if quotation token doesnt exist ,it means he /she can go to next page

        if (!returnQuotation.token && !transferQuotation.token) {
            alert(appData?.words["strPleaseSelectaCarTypeFor"]);
            return
        }

        if (!returnQuotation.token) {
            alert(appData?.words["strPleaseSelectYourCarTypeForYour"]);
            return
        }
        if (!transferQuotation.token) {
            alert(appData?.words["strPleaseSelectaCarTypeFor"]);
            return
        }

        router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)


    };
    const onChangeSetDateTimeHandler = (params = {}) => {
        let { value, hourOrMinute, journeyType } = params
        dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
        // getQuotations()
    }

    const getQuotations = (params = {}) => {

        const checkedReservations = normalizeReservations(reservations);

        let errorHolder = reservationSchemeValidator({ reservations: checkedReservations });

        setInternalState({ errorHolder })
        let propsReadyToCollectQuotationOptions = {
            dispatch,
            setInternalState,
            router,
            journeyType,
            reservations: checkedReservations,
            language,
            shouldNavigate: false, env, currencyId: selectedCurrency.currencyId
        }
        if (errorHolder.status === 200) readyToCollectQuotationOptions(propsReadyToCollectQuotationOptions)
    }

    const [showMapOneWay, setShowMapOneWay] = useState(false)
    const [showMapReturn, setShowMapReturn] = useState(false)

    useEffect(() => {
        //for mobile scrolling
        const container = document?.querySelector("#main_container");
        if (990 > document?.documentElement?.clientWidth) {
            window.scroll({
                top: container?.getBoundingClientRect()?.top - 82,
                left: 0,
                behavior: "smooth",
            });
        }
        localStorage.setItem("path", router.asPath);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (didMountRef.current) {
            if (reservations?.[0]?.transferDetails?.transferDateTimeString || reservations?.[1]?.transferDetails?.transferDateTimeString) {
                getQuotations();
            }
        } else {
            // İlk render'da çalışmaz ama flag setlenir
            didMountRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservations?.[0]?.transferDetails?.transferDateTimeString, reservations?.[1]?.transferDetails?.transferDateTimeString, selectedCurrency.currencyId]);

    useEffect(() => {
        reservationsRef.current = reservations;
    }, [reservations]);

    const didmountRefStorage = useRef(false);

    useEffect(() => {
        if (!didmountRefStorage.current) {
            didMountRef.current = true;

            if (+journeyType === 1) {
                if (reservations[0].quotation.carId && reservations[1].quotation.carId) {
                    localStorage.setItem("journeyQuotation", JSON.stringify(reservations[0].quotation));
                    localStorage.setItem("returnJourneyQuotation", JSON.stringify(reservations[1].quotation));
                } else {
                    localStorage.setItem("journeyQuotation", JSON.stringify(quotations[0].quotationOptions[0]));
                    localStorage.setItem("returnJourneyQuotation", JSON.stringify(quotations[0].quotationOptions[0]));
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (
        <Layout loggedIn={data} pageUrl={router.pathname}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >

                        <div className={"steps_div"}>
                            <Steps twoIspending={true} oneIsDone={true} />
                        </div>
                        {
                            reservations.map((obj, index) => {
                                let reservationError = (internalState.errorHolder.status === 403 && Array.isArray(internalState.errorHolder.reservations)) ? internalState.errorHolder.reservations?.[index] : {};

                                let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                                let { transferDateTimeString } = transferDetails

                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                                return (
                                    <div key={index} style={{ marginBottom: `${index === 0 ? "1rem" : "0"}` }}>
                                        {+journeyType === 0 && index === 0 ? <h2 className={`${styles.title}`}>{appData?.words["seGoingDetails"]}</h2> : <React.Fragment></React.Fragment>}
                                        {/* {index === 1 ? <h2 className={`${styles.title}`}>{appData?.words["seReturnDetails"]}</h2> : <React.Fragment></React.Fragment>} */}
                                        <div className={`${styles.main_container} `}>
                                            <div className={`${styles.quotation_panel}`} style={{ height: +journeyType === 0 ? "800px" : "" }}>
                                                <div className={styles.form_div} action="">
                                                    {
                                                        ["pickup", "dropoff"].map((destination) => (
                                                            <QuotatıonInputHandleComponent
                                                                key={destination}
                                                                destination={destination}
                                                                selectedPoints={destination === "pickup" ? selectedPickupPoints : selectedDropoffPoints}
                                                                index={index}
                                                                reservationError={reservationError}
                                                                internalState={internalState}
                                                                env={env}
                                                                language={language}
                                                                appData={appData}
                                                                setInternalState={setInternalState}
                                                                reservationsRef={reservationsRef}
                                                                reservations={reservations}
                                                                reducerSessionToken={reducerSessionToken}
                                                                getQuotations={getQuotations}
                                                            />
                                                        ))
                                                    }
                                                    <QuotationInputDate
                                                        appData={appData}
                                                        index={index}
                                                        splitedDate={splitedDate}
                                                        reservations={reservations}
                                                        onChangeSetDateTimeHandler={onChangeSetDateTimeHandler}
                                                        selectedPickupPoints={selectedPickupPoints}
                                                    />

                                                    <QuotationHourMinute
                                                        appData={appData}
                                                        env={env}
                                                        language={language}
                                                        splitedMinute={splitedMinute}
                                                        selectedPickupPoints={selectedPickupPoints}
                                                        splitedHour={splitedHour}
                                                        index={index}
                                                        onChangeSetDateTimeHandler={onChangeSetDateTimeHandler}
                                                    />
                                                    {internalState[`error-booking-message-${index}`] ?
                                                        <div className={styles.errorBookedMessage}>
                                                            <p>{internalState[`error-booking-message-${index}`]}</p>
                                                        </div>
                                                        : <></>}
                                                    <Button
                                                        disabled={internalState[`quotation-loading`]}
                                                        onBtnClick={(e) => getQuotations(e)}
                                                        type={BUTTON_TYPES.PRIMARY_OUTLINE}
                                                        style={{ marginTop: "1rem", padding: `${"10px"}`, width: '100%', }}
                                                        btnText={`${appData?.words["seUpdateQuotation"]}`}
                                                    />
                                                </div>


                                                {(() => {
                                                    const showMap =
                                                        ((selectedDropoffPoints.length > 0 && index === 1) && showMapReturn) ||
                                                        ((selectedPickupPoints.length > 0 && index === 0) && showMapOneWay) ||
                                                        ((selectedDropoffPoints.length > 0 && selectedPickupPoints.length > 0) && +journeyType === 0);

                                                    return showMap ? (
                                                        <div className={styles.map_direction}>
                                                            <Map env={env} datas={quotations[index]} selectedPickPoints={selectedPickupPoints} selectedDroppOfPoints={selectedDropoffPoints} />
                                                        </div>
                                                    ) : null;
                                                })()}
                                            </div>
                                            {/* //*Card item of results */}

                                            <div  >
                                                {!internalState[`error-booking-message-${index}`] && selectedPickupPoints.length > 0 && selectedDropoffPoints.length > 0 &&
                                                    <CardQuotationItem
                                                        index={index}
                                                        distance={quotations[index].distance}
                                                        duration={quotations[index].duration}
                                                        selectedQuotation={reservations[index]?.quotation}
                                                        quotationOptions={quotations[index].quotationOptions}
                                                        quotationLoading={internalState[`quotation-loading`]}
                                                        gotoTransferDetailsClick={gotoTransferDetailsClick}
                                                        journeyType={journeyType}
                                                        setShowMapOneWay={setShowMapOneWay}
                                                        setShowMapReturn={setShowMapReturn}
                                                        showMapOneWay={showMapOneWay}
                                                        showMapReturn={showMapReturn}
                                                        currencyId={selectedCurrency.currencyId}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Quotation;

export async function getServerSideProps({ req, res }) {
    let verify = req.cookies["user-id"];

    if (req.url === "/quotation-results") {
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