import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { quotationImagesObjWebp } from '../../../constants/quotationImages'
import styles from "./styles.module.scss"
import { splitAndTranslateDuration } from '../../../helpers/splitHelper'
import currencies from '../../../constants/currencies'
import { getPriceDetailsFromQuotation } from '../../../helpers/getPriceDetailsFromQuotation'
const TransferJourneySummaryPanel = (props) => {
    let { index, quotation, selectedPickupPoints, selectedDropoffPoints, splitedDate, splitedHour, splitedMinute, isTaxiDeal = false, journeyType, language, setOpenModal } = props

    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params: { quotations, direction, selectedCurrency } ,appData} = state
    
    const [formattedDuration, setFormattedDuration] = useState(null)
    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    const distanceInMiles = quotations[index].distance ? parseFloat(quotations[index].distance.replace(' mile', '')) : null;
    const distanceInKm = distanceInMiles ? (distanceInMiles * 1.60934).toFixed(2) : null;
    // Format the duration based on the language
    const symbol = currencies.find(c => c.currencyId === +selectedCurrency.currencyId)?.symb || "£";
    let _quotationDetails = getPriceDetailsFromQuotation({ quotation }).data || {}

    useEffect(() => {
        if (quotations[index]?.duration && language && appData) {
            const formatted = splitAndTranslateDuration(quotations[index].duration, language, appData);
            setFormattedDuration(formatted);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, appData]);
    return (
        <div className={`${styles.journey_summary_panel}`}>
            <div className={styles.content}>
                <h3>{index === 0 ? appData?.words["strYourBookingDetails"] : appData?.words["strReturnJourneyDetails"]}</h3>
                <div className={`${styles.journey_card} ${direction === 'rtl' && styles.rtljourney_card}`}>

                    <div d={quotation.carId}
                        className={`${styles.img_div}
                          ${quotation.carId === 6 || quotation.carId === 5 ? styles.cardIdSix : ""} 
                          ${quotation.carId === 3 || quotation.carId === 3 ? styles.cardIdThree : ""} 
                          ${quotation.carId === 4 ? styles.carIdFour : ""}
                           ${quotation.carId === 2 ? styles.carIdTwo : ""}`}
                        style={{ backgroundImage: `url(${quotationImagesObjWebp[quotation?.carId]?.image})` }}>
                        <div className={styles.stars}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </div>


                    </div>
                    <div className={styles.details_div}>
                        <div id="from to" className={styles.fromto}>
                            <h5> {appData?.words["strFrom2"]}:      </h5>

                            {selectedPickupPoints.map((pickup, i) => {
                                const addressText = pickup.address.includes(pickup.postcode)
                                    ? `${pickup.address}`
                                    : `${pickup.address} ${pickup.postcode ? pickup.postcode : ""}`;
                                return (
                                    <li key={i + 15}>
                                        <span>{isTaxiDeal ? "" : `${i + 1}. `}{addressText}</span>
                                    </li>
                                );
                            })}
                            <h5>{appData?.words["strTo"]}:</h5>
                            {selectedDropoffPoints.map((dropoff, i) => {
                                const addressText = dropoff.address.includes(dropoff.postcode)
                                    ? `${dropoff.address}`
                                    : `${dropoff.address} ${dropoff.postcode ? dropoff.postcode : ""}`;
                                return (
                                    <li key={i + 15}>
                                        <span>{isTaxiDeal ? "" : `${i + 1}. `}{addressText}</span>
                                    </li>
                                );
                            })}
                            <h5>{appData?.words["strOn"]}:</h5>
                            <li>
                                <span>
                                    {direction === 'rtl'
                                        ? `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$1-$2-$3")}`
                                        : `${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}

                                    &nbsp;
                                    {`${splitedHour}:${splitedMinute}`}
                                </span>
                            </li>

                        </div>
                    </div>
                </div>
                <div className={styles.total_journey}>
                    <div className={styles.text_1}>{appData?.words["strTotalLengthofJourney"]} </div>
                    <div className={styles.duration}>
                        <span>{appData?.words["strDistance"]}</span>
                        <span>{distanceInMiles} {appData?.words["strMiles"]} ({distanceInKm} km)</span>
                    </div>
                    <div className={styles.duration}>
                        <span>{appData?.words["strJourneyDurationTitle"]}</span>
                        <span>{formattedDuration ? formattedDuration : quotations[index]?.duration ? quotations[index]?.duration : null}</span>
                    </div>
                </div>

                <div style={{ border: 'none' }} className={styles.total_journey}>
                    <div className={styles.text_1}>{appData?.words["strYourVehicleDetails"]}</div>
                    <div className={styles.duration}>
                        <span>{carObject[quotation.carId]?.transferType}</span>
                    </div>
                    <div className={styles.duration}>
                        <span>{appData?.words["strMax"]}</span>
                        <span>
                            {appData.words["strCarFeatureMaxSuitcases"].replace("{{}}", carObject[quotation.carId]?.suitcases)}
                        </span>
                    </div>
                    <div className={styles.duration}>
                        <span>{appData?.words["strMax"]}</span>
                        <span>
                            {appData.words["strCarFeatureMaxPassengers"].replace("{{}}", carObject[quotation.carId]?.pax)}
                        </span>
                    </div>
                    {/* {<Link href="/quotation-results" style={{ textTransform: "capitalize" }}> {appData?.words["strChangeCar"]} </Link>} */}
                </div>

                <div className={styles.price_div}>
                    <div className={styles.text_1}>{appData?.words["strPriceTitle"]} </div>
                    <div className={styles.price}>
                        {symbol}
                        {
                            quotations[0]?.taxiDeal ? (quotation.exchangedPrice ? quotation.exchangedPrice : quotation.price) : quotation.normalExchangedPrice
                        }
                    </div>
                </div>
                {_quotationDetails.price !== _quotationDetails.normalPrice && !isTaxiDeal ?
                    <div className={styles.additionalPrice}>
                        <p className={styles.text_1}>{appData?.words["strLastMinuteBookingFee"]}

                            <span>
                                <i className={`fa-solid fa-circle-info`} onClick={() => setOpenModal(true)}></i>
                            </span>
                        </p>
                        <p className={styles.price}>{symbol}  {(parseFloat(_quotationDetails.price) - parseFloat(_quotationDetails.normalPrice)).toFixed(2)}</p>
                    </div> : <></>}

                {_quotationDetails.price !== _quotationDetails.normalPrice && !isTaxiDeal ?
                    <div className={styles.TotalPrice}>
                        <p className={styles.text_1}>{appData?.words["strTotalPrice"]}</p>
                        <p className={styles.price}>{symbol}  {parseFloat(_quotationDetails.price)}</p>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default TransferJourneySummaryPanel
