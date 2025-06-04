import { useDispatch, useSelector } from 'react-redux';
import CheckingForPostcodes from './CheckingForPostcodes';
import CheckForFlight from './CheckForFlight';
import styles from "./styles.module.scss"
import React from 'react'
import CheckForCruises from './CheckForCruises';
import CheckForTrain from './CheckForTrain';


const SelectedPointOnTransferDetails = (props) => {
    //index it is a destination if 0 it means pick up
    let { selectedPoints, journeyType, type, pointsError = props.selectedPoints.map(obj => ({})), language, isTaxiDeal = false, isTours = false, env } = props;
    const state = useSelector(state => state.pickUpDropOffActions)
    let { appData } = state
    const dispatch = useDispatch()
    const imageObjects = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: item.image }), {}); //1:"/media/mglafg5zqlrsocfwodwj.svg"
    const objectDetailStatuses = appData?.pointTypeCategories?.reduce((obj, item) => ({ ...obj, [item.id]: JSON.parse(item.detailsStatus), }), []);//cruiseNumber:{ pickup: 1, dropoff: 2, fieldType: 'text' }
    // 1:index of point
    // type is pickup or dropoff
    // journeyType is index of reservation
    return (
        <>
            {selectedPoints?.map((point, i) => {
                let pointError = Array.isArray(pointsError) && typeof pointsError[i] === 'object' ? pointsError[i] : {}

                return (
                    <div className={`${styles.selected_list} ${isTaxiDeal ? styles.istaxideal_selected_list : ""} ${selectedPoints.length > 0 ? "m_0" : ""}`} key={i} id="selectedlist">
                        <div className={styles.list_container}>
                            {
                                isTaxiDeal ? <></> : <div className={styles.list}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {imageObjects && <img className={styles.list_image} src={`${env.apiDomain}${imageObjects[point.ptype === 3 ? 10 : point?.pcatId]}`} alt={point.address} />}
                                    <p className={styles.list_description}>
                                        {point.address.includes(point.postcode) ? `${point.address}` : `${point.address} ${point?.postcode ? point.postcode : ""}`}
                                    </p>
                                </div>
                            }
                            {/* index it is a destination if 0 it means pick up  */}
                            {/* //!checking for flight pickups */}

                            {point.pcatId === 1 ?
                                <CheckForFlight
                                    type={type}
                                    point={point}
                                    error={pointError}
                                    journeyType={journeyType}
                                    objectDetailStatuses={objectDetailStatuses}
                                    isTaxiDeal={isTaxiDeal}
                                    isTours={isTours}
                                    onChange={flightDetails => dispatch({ type: 'SET_FLIGHT_DETAILS_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, flightDetails } })}
                                /> : <React.Fragment></React.Fragment>}

                            {/* //! checking for CheckForCruises  */}
                            {point.pcatId === 2 && point.ptype !== 3 ?
                                <CheckForCruises
                                    point={point}
                                    error={pointError}
                                    journeyType={journeyType}
                                    onChange={cruiseNumber => dispatch({ type: 'SET_CRUISE_NUMBER_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, cruiseNumber } })}
                                /> : <React.Fragment></React.Fragment>}

                            {/* //! checking for CheckForTrain  */}
                            {point.pcatId === 3 && point.ptype !== 3 ?
                                <CheckForTrain
                                    point={point}
                                    journeyType={journeyType}
                                    onChange={trainNumber => dispatch({ type: 'SET_TRAIN_NUMBER_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, trainNumber } })}
                                /> : <React.Fragment></React.Fragment>}

                            {/* //! checking for postcodes  */}
                            {point.pcatId === 5 ?
                                <CheckingForPostcodes
                                    point={point}
                                    error={pointError}
                                    journeyType={journeyType}
                                    isTaxiDeal={isTaxiDeal}
                                    onChange={postCodeDetails => dispatch({ type: 'SET_POSTCODE_DETAILS_FOR_POINTS', 'data': { 'index': journeyType, type, 'pointIndex': i, postCodeDetails } })}
                                /> : <React.Fragment></React.Fragment>}





                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default SelectedPointOnTransferDetails