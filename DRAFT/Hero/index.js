import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../../helpers/splitHelper';
import { reservationSchemeValidator } from '../../../helpers/reservationSchemeValidator';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles.module.scss"
import RadioButton from './RadioButton'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, } from 'react'
import { useWindowSize } from '../../../hooks/useWindowSize';
import dynamic from 'next/dynamic'
import { titleStringOfHastaxiDeals } from '../../../helpers/titleStringOfHasTaxiDeals';
import HeroInputComponent from './InputHandleComponent';
import InputDateComponent from './InputDateComponent';
import HourMinuteComponent from './HourMinuteComponent';
import AdvertisimentImages from './AdvertisimentImages';
import { readyToCollectQuotationOptions } from '../../../helpers/readyToCollectQuotationOptions';
import { currentDateForJourney } from '../../../helpers/getDates';
const WaveLoading = dynamic(() => import('../../elements/LoadingWave'))
const Features = dynamic(() => import('../Features'))


const Hero = (props) => {

    let { islinknamecomponent = false, bggray = true, env } = props
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations, params } = state
    let { sessionToken: reducerSessionToken, journeyType, direction, language, hasTaxiDeals } = params
    const { appData } = useSelector(state => state.initialReducer)
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
        'show-pickup-extra-point-0': false,
        'show-dropoff-extra-point-0': false,
        'show-pickup-extra-point-1': false,
        'show-dropoff-extra-point-1': false,

        //focus
        'pickup-search-focus-0': false,//it is for modal
        'dropoff-search-focus-0': false,//it is for modal
        'pickup-search-focus-1': false,//it is for modal
        'dropoff-search-focus-1': false,//it is for modal

        "quotation-loading": false,
        'errorHolder': [],
        "error-booking-message-0": "",
        "error-booking-message-1": ""

    })
    // Store the latest value of `reservations` in a ref
    const reservationsRef = useRef(reservations);
    //collevcting points after resolving with 


    //getting quotations after resolving promise with 
    const onChangeSetDateTimeHandler = (params = {}) => {
        let { value, hourOrMinute, journeyType } = params
        dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
    };

    const getQuotations = useCallback((e) => {
        //when we add postcode point we set id :" "  if smone come back to home page change datetime we need to set id:0
        const checkedReservations = reservations.map((obj) => {
            const selectedPickupPoints = obj.selectedPickupPoints.map((point) => {
                if (point.pcatId === 5) {
                    return {
                        ...point,
                        postCodeDetails: { ...point.postCodeDetails, id: 0 },
                    };
                }

                if (point.pcatId === 1) {
                    return {
                        ...point,
                        flightDetails: {
                            ...point.flightDetails,
                            waitingPickupTime: 0,
                        },
                    };
                }

                return point;
            });

            const selectedDropoffPoints = obj.selectedDropoffPoints.map((point) => {
                if (point.pcatId === 5) {
                    return {
                        ...point,
                        postCodeDetails: { ...point.postCodeDetails, id: 0 },
                    };
                }

                if (point.pcatId === 1) {
                    return {
                        ...point,
                        flightDetails: {
                            ...point.flightDetails,
                            waitingPickupTime: 0,
                        },
                    };
                }

                return point;
            });

            return {
                ...obj,
                selectedPickupPoints,
                selectedDropoffPoints,
            };
        });

        let errorHolder = reservationSchemeValidator({ reservations: checkedReservations, appData });
        setInternalState({ errorHolder });
        if (errorHolder.status === 200) {
            readyToCollectQuotationOptions({ dispatch, setInternalState, router, journeyType, reservations: checkedReservations, language, shouldNavigate: true, env, appData })
        }
    }, [reservations, appData, setInternalState, readyToCollectQuotationOptions, dispatch, router, journeyType, language]);

    //when we go quotation page then go back In that case we should check
    //if we have points or not.
    //According to this we will show add extrapoint or not
    useEffect(() => {
        let { selectedDropoffPoints, selectedPickupPoints } = reservations[0]
        if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
            setInternalState({ [`show-pickup-extra-point-0`]: true, [`show-dropoff-extra-point-0`]: true })
        }
        // bu rendere sebeb olur
        dispatch({ type: "CHECHK_FLIGHT_WAITING_TIME", data: { journeyType } })

    }, [])

    // Update the ref whenever `reservations` changes in Redux
    useEffect(() => {
        reservationsRef.current = reservations;
    }, [reservations]);

    let size = useWindowSize();
    let { width } = size

    return (
        <div className={`${styles.hero} ${direction} page`} islinknamecomponent={String(islinknamecomponent)}>
            {/* {typeof window !== 'undefined' ?  */}
            <div className={`${styles.hero_section} page_section`}>
                <div className={`${styles.hero_section_container} page_section_container`}>
                    <div className={styles.points_content}>
                        <div className={styles.main_search}>
                            <div className={`${!islinknamecomponent ? styles.title_div_islinnkname : styles.title_div}`}>
                                <h1 style={{ textTransform: "capitalize" }} className={`${styles.title} ${direction} `}>
                                    {islinknamecomponent ? <span>{appData?.words[`${titleStringOfHastaxiDeals(hasTaxiDeals)}`]}</span> : <span>{appData?.words["searchEngineTitle"]}</span>}
                                </h1>
                            </div>
                            <br />
                            <RadioButton setInternalState={setInternalState} internalState={internalState} />
                            <br />
                            {reservations.map((obj, index) => {
                                let reservationError = (internalState.errorHolder.status === 403 && Array.isArray(internalState.errorHolder.reservations)) ? internalState.errorHolder.reservations?.[index] : {};
                                let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                                let { transferDateTimeString } = transferDetails
                                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(index === 0 ? currentDateForJourney() : transferDateTimeString) || []
                                const [splitedDate] = splitDateTimeStringIntoDate(index === 0 ? currentDateForJourney() : transferDateTimeString) || []

                                return (
                                    <div key={index}>
                                        {reservations.length > 1 && index == 0 ? <div className={`${styles.tr_journey_title} ${direction}`}>{appData?.words["seGoingDetails"]}</div> : <React.Fragment></React.Fragment>}
                                        {index == 1 ? <div className={`${styles.return_journey_title} ${direction}`}>{appData?.words["seReturnDetails"]}</div> : <React.Fragment></React.Fragment>}
                                        <div className={`${styles.points} ${direction}`} direction={String(direction === "rtl")}>
                                            {
                                                ["pickup", "dropoff"].map((destination) => (
                                                    <HeroInputComponent
                                                        key={destination}
                                                        destination={destination}
                                                        points={destination === "pickup" ? selectedPickupPoints : selectedDropoffPoints}
                                                        direction={direction}
                                                        appData={appData}
                                                        env={env}
                                                        index={index}
                                                        language={language}
                                                        reservations={reservations}
                                                        internalState={internalState}
                                                        reducerSessionToken={reducerSessionToken}
                                                        reservationsRef={reservationsRef}
                                                        reservationError={reservationError}
                                                        dispatch={dispatch}
                                                        setInternalState={setInternalState}
                                                    />
                                                ))
                                            }
                                            <InputDateComponent
                                                islinknamecomponent={islinknamecomponent}
                                                splitedDate={splitedDate}
                                                index={index}
                                                selectedPickupPoints={selectedPickupPoints}
                                                direction={direction}
                                                appData={appData}
                                                onChangeSetDateTimeHandler={onChangeSetDateTimeHandler}
                                                reservations={reservations}
                                            />
                                            <HourMinuteComponent
                                                islinknamecomponent={islinknamecomponent}
                                                splitedHour={splitedHour}
                                                splitedMinute={splitedMinute}
                                                index={index}
                                                selectedPickupPoints={selectedPickupPoints}
                                                direction={direction}
                                                appData={appData}
                                                onChangeSetDateTimeHandler={onChangeSetDateTimeHandler}
                                            />
                                            {/* when jtype is 1  button not gonna be visible on transfer details point */}
                                            {index === 1 && reservations.length > 1 || index === 0 && reservations.length === 1 ?
                                                <div className={`${styles.btn_div} ${styles.fifth_column}`}  >
                                                    {internalState[`quotation-loading`] ?
                                                        <div className={`btn btn_primary  disabled_button ${styles.waveloadingdiv}`} style={{ marginTop: '0px' }}>
                                                            <WaveLoading />
                                                        </div>
                                                        :
                                                        <button onClick={(e) => getQuotations(e)} className={`btn btn_primary`}>
                                                            <i className="fa-solid fa-magnifying-glass"></i>
                                                            <span>{appData?.words["seGetQuotation"]}</span>
                                                        </button>}
                                                </div>
                                                : <React.Fragment></React.Fragment>}

                                            {/* //empty div when it is both journey   */}
                                            {reservations.length > 1 && index === 0 ?
                                                <div className={`${styles.btn_div} ${styles.fifth_column} ${styles.hide_mobile} `}  >
                                                    {internalState[`quotation-loading`] ?
                                                        <div className={`btn btn_primary  disabled_button ${styles.waveloadingdiv}`}>
                                                        </div>
                                                        :
                                                        <button className={`btn btn_primary`} onClick={(e) => getQuotations(e)}>
                                                        </button>}
                                                </div>
                                                : <React.Fragment></React.Fragment>}
                                        </div>
                                        {internalState[`error-booking-message-${index}`] ?
                                            <div className={styles.errorBookedMessage}>
                                                <p>{internalState[`error-booking-message-${index}`]}</p>
                                            </div> : <></>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {islinknamecomponent && width > 768 ? <Features bggray={true} /> : <></>}
            <AdvertisimentImages islinknamecomponent={islinknamecomponent} width={width} />


        </div >
    )
}

export default Hero
