
import styles from "./styles.module.scss"
import Button from "../Button/Button";
import { BUTTON_TYPES } from "../Button/ButtonTypes";

const SelectedCardItem = ({
    item,
    index,
    direction,
    appData,
    carObject,
    quotationLoading,
    selectedQuotation,
    changeCar,
    accordionStatus,
    currencySymbols, formattedDuration,
    quotationImagesObjWebp
}) => {
    const price = `${item?.normalExchangedPrice}`;
    const finalPrice = `${currencySymbols[item?.exchangedCurrencyId] || "£"}${price?.split(".")[0]}.`;
    const carData = carObject[item?.carId];
    const storageKey = index === 0 ? "journeyQuotation" : "returnJourneyQuotation";
    const localSelectedCarId = Number(JSON.parse(localStorage?.getItem(storageKey))?.carId);
    const renderSelectedItem = localSelectedCarId === Number(quotationImagesObjWebp[item?.carId]?.id);
    const selected = Number(selectedQuotation?.carId) === Number(carData?.id);

    if (!(renderSelectedItem && accordionStatus)) return null;

    return (
        <div
            dataid={index === 0 ? "first_car" : ""}
            className={`${styles.card_item} ${selected ? styles.selectedCard : ""}`}
        >
            <div
                data={quotationImagesObjWebp[item?.carId]?.id}
                className={styles.column_first}
                style={{ backgroundImage: `url(${quotationImagesObjWebp[item?.carId]?.image})` }}
            ></div>

            <div className={styles.column_second}>
                <div className={styles.column_second_flex_column}>
                    <div className={styles.name_and_postcode_div}>
                        <div className={styles.postcode}>
                            <p className={styles.type}>{carData?.transferType}</p>
                            <p className={styles.durationn}>
                                <i className="fa-solid fa-clock"></i> <span>{formattedDuration}</span>
                            </p>
                            <div className={styles.feature_column}>
                                <i className="fa-solid fa-suitcase"></i><span>{carData?.suitcases}</span>
                            </div>
                        </div>
                        <h3 className={styles.name}>
                            {carData?.name}
                            <span className={styles.type}>{carData?.transferType}</span>
                            <div className={styles.feature_column}>
                                <i className="fa-solid fa-user"></i> <span>{carData?.pax}</span>
                            </div>
                        </h3>
                    </div>

                    <div className={styles.car_features}>
                        <div className={styles.feature_column}>
                            <i className="fa-solid fa-user"></i> <span>{carData?.pax}</span>
                        </div>
                        <div className={styles.feature_column}>
                            <i className="fa-solid fa-suitcase"></i><span>{carData?.suitcases}</span>
                        </div>
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

                        {/* Smaller screen features */}
                        <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>
                            <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i>
                            <span>{appData?.words["strCarFeatureFlightTracking"]}</span>
                        </p>
                        <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>
                            <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i>
                            <span>{appData?.words["strCarFeatureFreeMeetAndGreet"]}</span>
                        </p>
                        <p className={`${styles.apl_feature} ${styles.show_less_than360} ${styles.show_less_than360_with_price}`}>
                            <span>
                                <i className={`fa-solid fa-check ${direction === "rtl" ? styles.leftFeatureIcon : ""}`}></i>
                                <span>{appData?.words["strFreeCancellation24h"]}</span>
                            </span>
                            <span className={styles.price_span}>
                                {quotationLoading ? "..." : finalPrice}
                                <span>00</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={`${direction === "rtl" ? styles.thirdcolumnDirection : ""} ${styles.column_third}`}>
                <div className={styles.duration_price}>
                    <div className={styles.price}>
                        {quotationLoading ? "..." : `${finalPrice}.`} <span>{quotationLoading ? "" : "00"}</span>
                    </div>
                </div>
                <div className={`${styles.btn_div} ${selected ? styles.selectedBtnDiv : ""}`}>
                    <Button
                        type={BUTTON_TYPES.PRIMARY_OUTLINE}
                        onBtnClick={changeCar}
                        style={{ padding: "10px 17.5px", width: "100%" }}
                        btnText={!selectedQuotation?.carId ? appData?.words["strSeeAllCars"] : appData?.words["strYouSelected"]}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectedCardItem;
