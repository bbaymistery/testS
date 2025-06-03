import React from 'react'
import Button from '../Button/Button'
import { BUTTON_TYPES } from '../Button/ButtonTypes'
import styles from "./styles.module.scss"
import WaveLoading from '../Loadings/LoadingWave'
const OneWayCardItemComponent = (props) => {
    let { journeyType, carObject, currencyId, selectedQuotation, formattedDuration, currencySymbols, quotationImagesObjWebp, datas, handleClickForMobile, quotationLoading, direction, setQuotationHandleClick, appData } = props

    return (+journeyType === 0) && [...datas.filter(item => item.carId !== 4), ...datas.filter(item => item.carId === 4)]?.map((item, index) => {
        let selected = Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id)
        const price = `${item.normalExchangedPrice}`;
        const finalPrice = `${currencySymbols[item?.exchangedCurrencyId] || "£"}${price?.split(".")[0]}.`;
        return (
            <div id="main_container" key={index + 100000}>
                <div
                    // eslint-disable-next-line react/no-unknown-property
                    dataid={index === 0 ? "first_car" : ""}
                    className={`${styles.card_item} ${Number(selectedQuotation?.carId) === Number(quotationImagesObjWebp[item?.carId].id) ? styles.selectedCard : ""}`}
                    onClick={(e) => handleClickForMobile({ e, quotation: item })} >
                    <div data={quotationImagesObjWebp[item?.carId].id} className={styles.column_first} style={{ backgroundImage: `url(${quotationImagesObjWebp[item?.carId]?.image})` }}> </div>
                    <div className={styles.column_second}>
                        <div className={styles.column_second_flex_column}>
                            <div className={styles.name_and_postcode_div}>
                                <div className={styles.postcode}>
                                    <p className={styles.type}>  {carObject[item?.carId]?.transferType}</p>
                                    <p className={styles.durationn}><i className="fa-solid fa-clock"></i>  <span>{formattedDuration}</span></p>
                                    <div className={styles.feature_column}> <i className="fa-solid fa-suitcase"></i><span>{carObject[item?.carId]?.suitcases}</span></div>
                                </div>
                                <h3 className={styles.name}>
                                    {carObject[item?.carId]?.name}
                                    <span className={styles.type}>{carObject[item?.carId]?.transferType}</span>
                                    <div className={styles.feature_column}> <i className="fa-solid fa-user"></i> <span>{carObject[item?.carId]?.pax}</span>  </div>
                                </h3>
                            </div>
                            <div className={styles.car_features}>
                                <div className={styles.feature_column}> <i className="fa-solid fa-user"></i> <span>{carObject[item?.carId]?.pax}</span>  </div>
                                <div className={styles.feature_column}> <i className="fa-solid fa-suitcase"></i><span>{carObject[item?.carId]?.suitcases}</span></div>
                            </div>
                            <div className={styles.apl_features}>
                                {[
                                    "strCarFeatureFreeMeetAndGreet",
                                    "strCarFeatureNoCharge4Delay",
                                    "strCarFeatureFreeWaitingTime",
                                    "strFreeCancellation24h",
                                    "strCarFeatureFlightTracking",
                                    "strComfortableVehicles"
                                ].map((key, idx) => (
                                    <p key={key + idx} className={`${styles.apl_feature} ${styles.show_more_than360}`}>
                                        <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i>
                                        <span>{appData?.words[key]}</span>
                                    </p>
                                ))}
                                <p className={`${styles.apl_feature} ${styles.show_less_than360}`}><i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureFlightTracking"]}</span></p>
                                <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>  <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i><span>{appData?.words["strCarFeatureFreeMeetAndGreet"]}</span></p>
                                <p className={`${styles.apl_feature} ${styles.show_less_than360} ${styles.show_less_than360_with_price}`}>
                                    <span>
                                        <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}>
                                        </i>
                                        <span>{appData?.words["strFreeCancellation24h"]}</span>
                                    </span>

                                    <span className={`${styles.price_span}`} >
                                        {quotationLoading ? "..." : `£${item?.price.split(".")[0]}.`}
                                        <span>00</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={` ${styles.column_third}`}>
                        <div className={styles.duration_price}>
                            <div className={styles.price}>{quotationLoading ? "..." : finalPrice} <span>{quotationLoading ? "" : "00"}</span> </div>
                        </div>
                        <div className={`${styles.btn_div} ${selected ? styles.selectedBtnDiv : ""}`}>
                            <Button
                                type={BUTTON_TYPES.PRIMARY_OUTLINE}
                                onBtnClick={() => setQuotationHandleClick({ quotation: item })}
                                style={{ padding: "10px 38.5px", width: '100%' }}
                                btnText={
                                    quotationLoading ? <WaveLoading /> : selected
                                        ? `${appData?.words["quSelectedButton"]}` : `${appData?.words["quSelectButton"]}`
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}

export default OneWayCardItemComponent