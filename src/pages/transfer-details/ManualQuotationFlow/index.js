import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TransferJourneySummaryPanel from '../../../components/elements/TransferJourneySummaryPanel';
import { ifHasUnwantedCharacters } from '../../../helpers/ifHasUnwantedCharacters';
import { reservationSchemeValidator } from '../../../helpers/reservationSchemeValidator';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../../helpers/splitHelper';
import CheckBox from './ManuelFlowCheckBox/CheckBox';
import styles from "../styles.module.scss";
import HandlePassengerDetailsTransferForm from '../transferDetailsComponents/HandlePassengerDetailsTransferForm';
import TransferDetailsBackNextButton from '../transferDetailsComponents/TransferDetailsBackNextButton';
import TransferDetailsTeaxtArea from '../transferDetailsComponents/TransferDetailsTeaxtArea';
import ManuelFlowSelectedPointsDetails from './ManuelFlowSelectedPointsDetails';

const ManualQuotationFlow = (props) => {


  let { appData, env, language, reservations, direction, journeyType, passengerDetailsStatus } = props

  const dispatch = useDispatch()
  const router = useRouter()


  let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
    'errorHolder': [],
    'pickup-search-value-0': '',
    'dropoff-search-value-0': '',
    'collecting-pickup-points-0': [],
    'collecting-dropoff-points-0': [],
    //focus
    'pickup-search-focus-0': false,//it is for modal
    'dropoff-search-focus-0': false,//it is for modal

    'pickup-search-loading-0': false,
    'dropoff-search-loading-0': false,

    //quotation loading
    "quotation-loading": false,
  })
  let { errorHolder } = internalState;


  const checkValidation = (e) => {
    let errorHolder = reservationSchemeValidator({ reservations, appData }, { checkTransferDetails: true });
    setInternalState({ errorHolder })
    console.log(errorHolder);

    if (errorHolder.status === 200) router.push(`${language === 'en' ? "/payment-details" : `${language}/payment-details`}`)
  }
  //for passengers information
  const handleTextarea = (e, index) => {
    let { name, value } = e.target;
    //hinder user  to add some Characters
    if (ifHasUnwantedCharacters(value)) return
    if (["specialRequests"].includes(name))
      dispatch({ type: 'SET_TRANSFER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
  }
  const [openModal, setOpenModal] = useState(false)

  const setToFalse = () => {
    setOpenModal(false)
  };
  const handleClose = () => {
    if (openModal) {

      setOpenModal(false)

    }
  }



  return (
    <div className={styles.transferdetails_subcontainer} id="main_container">
      {reservations.map((obj, index) => {
        let reservationError = (errorHolder.status === 403 && Array.isArray(errorHolder.reservations)) ? errorHolder.reservations[index] : {};
        let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
        let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
        let { phone, email, firstname } = passengerDetails
        const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
        const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
        return (
          <div key={index} >
            <div className={`${styles.transferdetails_subcontainer_content} ${direction}`}>
              <div className={`${styles.transferdetails_subcontainer_content_points_and_passengerdetails}`}>

                <HandlePassengerDetailsTransferForm
                  passengerDetailsStatus={passengerDetailsStatus}
                  index={index}
                  appData={appData}
                  reservationError={reservationError}
                  email={email}
                  firstname={firstname}
                  phone={phone}
                  passengersNumber={passengersNumber}
                  quotation={quotation}
                  direction={direction}

                />

                <ManuelFlowSelectedPointsDetails
                  appData={appData}
                  selectedDropoffPoints={selectedDropoffPoints}
                  selectedPickupPoints={selectedPickupPoints}
                  reservationError={reservationError}
                  language={language}
                  env={env}
                  index={index}
                />
                <TransferDetailsTeaxtArea appData={appData} specialRequests={specialRequests} index={index} handleTextarea={handleTextarea} />

                {index === 1 ? <CheckBox direction={direction} textSame={appData?.words["strPassengerDetailsCheckBox"]} textNotSame={appData?.words["strThePassengerDetailsAreNotSame"]} /> : <React.Fragment></React.Fragment>}
                {index === 1 || (index === 0 && +journeyType === 0) ?
                  <TransferDetailsBackNextButton direction={direction} router={router} appData={appData} checkValidation={checkValidation} />
                  : <></>}
              </div>
              <TransferJourneySummaryPanel
                setOpenModal={setOpenModal}
                language={language} journeyType={journeyType}
                index={index} splitedHour={splitedHour} splitedMinute={splitedMinute}
                splitedDate={splitedDate} quotation={quotation} selectedDropoffPoints={selectedDropoffPoints}
                selectedPickupPoints={selectedPickupPoints} />
            </div>

          </div>
        )
      })}
      {openModal ?
        <div className={` ${styles.modal} `} onClick={handleClose}>
          <div className={`${styles.modal_container}`} id="infoModal">
            <div>{appData.words["strLastMinuteBookinginfo"]}  </div>
            <i onClick={setToFalse} className={`fa-solid fa-x ${styles.close_icon}`}></i>
          </div>
        </div>
        : <React.Fragment></React.Fragment>}
    </div>
  )
}

export default ManualQuotationFlow