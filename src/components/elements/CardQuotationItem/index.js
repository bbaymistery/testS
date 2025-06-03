import { useRouter } from 'next/router';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { quotationImagesObjWebp } from '../../../constants/quotationImages';
import styles from "./styles.module.scss";
import HeaderOfResults from './HeaderOfResults';
import { BUTTON_TYPES } from '../Button/ButtonTypes';
import Button from '../Button/Button';
import { splitAndTranslateDuration } from '../../../helpers/splitHelper';
import VisibleAccordionContent from './VisibleAccordionContent';
import SelectedCardItem from './SelectedCardItem';
import OneWayCardItemComponent from './OneWayCardItemComponent';
// let finalPrice=`£${item?.price.split(".")[0]}.`
const currencySymbols = {
  1: "€", // EUR
  2: "$", // USD
  3: "£", // GBP
  4: "₺"  // TRY
};
const checkJourneyTypeAndAddQuotationToReducer = (params = {}) => {
  //by this index  we r gonna assure in which journey we should add quotation
  //by journey type we r gonn assure should we directly pass to next page or not
  let { journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations } = params

  //if it is both way journey then do not push directly to other page
  if (parseInt(journeyType) === 1) {
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
  } else {
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
    //if is taxi deal tru it means we should remove selected point from redux (because someofthem can be with  --select--)
    if (isTaxiDeal) {
      if (quotations[0]?.taxiDeal?.pickupPoints.length > 1) {

        dispatch({ type: "RESELECT_POINTS_FROM_STORE", data: { type: "pickup" } })
      }
      if (quotations[0]?.taxiDeal?.dropoffPoints.length > 1) {
        dispatch({ type: "RESELECT_POINTS_FROM_STORE", data: { type: "dropoff" } })
      }
      router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)
    } else {
      router.push(`${language === 'en' ? "/transfer-details" : `${language}/transfer-details`}`)

    }
  }
}
const CardQuotationItem = (params = {}) => {

  //by this index  we r gonna assure in which journey we should add quotation
  let {
    quotationOptions: datas,
    selectedQuotation,
    index,
    quotationLoading,
    duration,
    distance,
    isTaxiDeal = false,
    gotoTransferDetailsClick = () => { },
    setShowMapOneWay = () => { },
    setShowMapReturn = () => { },
    showMapReturn = false,
    showMapOneWay = false,
    currencyId
  } = params

  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { journeyType, direction, language, quotations }, appData } = state
  //cartypes object for card item as {1:{image:'sds, name:Economy}}
  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
  const [journeyAccrodionStatus, setJourneyAccrodionStatus] = useState(true)
  const [returnJourneyAccordionStatus, setReturnJourneyAccordionStatus] = useState(true)
  console.log({ quotationImagesObjWebp });


  // Format the duration based on the language
  const formattedDuration = splitAndTranslateDuration(duration, language, appData);

  const setQuotationHandleClick = async (params = {}) => {
    let { quotation } = params
    checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })
    if (journeyType === 1) {
      if (index === 0) {
        localStorage.setItem("journeyQuotation", JSON.stringify(quotation));
        setJourneyAccrodionStatus(true)
      }
      if (index === 1) {
        localStorage.setItem("returnJourneyQuotation", JSON.stringify(quotation));
        setReturnJourneyAccordionStatus(localStorage?.getItem("returnJourneyQuotation") ? true : false)
      }
    }
  };

  const handleClickForMobile = ({ e, quotation }) => {
    if (451 > document.documentElement.clientWidth)
      checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch, language, isTaxiDeal, quotations })

  };

  const changeCar = () => {
    if (journeyType === 1) {
      if (index === 0) {
        localStorage.removeItem("journeyQuotation");
        setJourneyAccrodionStatus(false)
      }
      if (index === 1) {
        localStorage.removeItem("returnJourneyQuotation");
        setReturnJourneyAccordionStatus(false)
      }
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: "column", }}>
      {journeyType === 1 && (
        <h2 className={`${styles.title} ${direction}`}>
          <span onClick={() => index === 0 ? setShowMapOneWay(!showMapOneWay) : setShowMapReturn(!showMapReturn)}>
            {index === 0 ? (!showMapOneWay ? "Show Map" : "Hide Map") : (!showMapReturn ? "Show Map" : "Hide Map")}
          </span>
          <span>
            {index === 0 ? appData?.words["seGoingDetails"] : appData?.words["seReturnDetails"]}
          </span>
        </h2>
      )}

      <div className={`${styles.result_container}`}>
        <HeaderOfResults duration={duration} distance={distance} />

        {journeyType === 1 && [0, 1].includes(index) && (
          [...datas.filter(item => item.carId !== 4), ...datas.filter(item => item.carId === 4)].map((item, i) => (
            <SelectedCardItem
              key={item.carId}
              item={item}
              index={index}
              direction={direction}
              appData={appData}
              carObject={carObject}
              quotationLoading={quotationLoading}
              selectedQuotation={selectedQuotation}
              changeCar={changeCar}
              accordionStatus={index === 0 ? journeyAccrodionStatus : returnJourneyAccordionStatus}
              journeyType={journeyType}
              currencySymbols={currencySymbols}
              currencyId={currencyId}
              quotationImagesObjWebp={quotationImagesObjWebp}
              formattedDuration={formattedDuration}
            />
          ))
        )}

        <VisibleAccordionContent
          journeyType={journeyType}
          datas={datas}
          quotationLoading={quotationLoading}
          selectedQuotation={selectedQuotation}
          carObject={carObject}
          direction={direction}
          appData={appData}
          handleClickForMobile={handleClickForMobile}
          index={index}
          setQuotationHandleClick={setQuotationHandleClick}
          journeyAccrodionStatus={journeyAccrodionStatus}
          returnJourneyAccordionStatus={returnJourneyAccordionStatus}
          setJourneyAccrodionStatus={setJourneyAccrodionStatus}
          currencyId={currencyId}
          currencySymbols={currencySymbols}
          formattedDuration={formattedDuration}
        />

        <OneWayCardItemComponent
          journeyType={journeyType}
          carObject={carObject}
          currencyId={currencyId}
          selectedQuotation={selectedQuotation}
          formattedDuration={formattedDuration}
          currencySymbols={currencySymbols}
          quotationImagesObjWebp={quotationImagesObjWebp}
          datas={datas}
          handleClickForMobile={handleClickForMobile}
          quotationLoading={quotationLoading}
          direction={direction}
          setQuotationHandleClick={setQuotationHandleClick}
          appData={appData}
        />

      </div>
      {index === 1 &&
        <div className={styles.result_container}>
          <div className={`${styles.items_buttons}`}>
            <div>
              <div onClick={() => router.back()}>
                <Button type={BUTTON_TYPES.PRIMARY_OUTLINE} style={{ padding: "10px 28.5px", }} btnText={`${appData?.words["strGoBack"]}`} />
              </div>
            </div>
            <div>
              <div onClick={gotoTransferDetailsClick}>
                <Button type={BUTTON_TYPES.PRIMARY_OUTLINE} style={{ padding: "10px 28.5px", }} btnText={`${appData?.words["strContinue"]}`} />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CardQuotationItem