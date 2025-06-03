import React from 'react';
import styles from './styles.module.scss';
import OutsideClickAlert from '../../components/elements/OutsideClickAlert';
import HandleSearchResults from '../../components/elements/HandleSearchResults';
import SelectedPointsOnHomePage from '../../components/elements/SelectedPointsOnHomePage';
import SearchInputLoading from '../../components/elements/SearchInputLoading';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwantedCharacters';
import { collectPointsAsync } from '../../helpers/collectPoints';


const QuotatıonInputHandleComponent = (props) => {


  let {
    destination,
    direction,
    index,
    reservationError,
    internalState,
    selectedPoints,
    env,
    language,
    appData,
    setInternalState,
    getQuotations,
    reducerSessionToken,
    reservationsRef,
    reservations,
  } = props;

  const isPickup = destination === "pickup";
  const placeholder = appData?.words["searchEngineTitle"];
  const headingKey = isPickup ? "sePickUpLocation" : "seDropOffLocation";
  const pointsTitleKey = isPickup ? "strPickupPoints" : "strDropoffPoints";
  const errorKey = isPickup ? "selectedPickupPoints" : "selectedDropoffPoints";

  const handleAddNewInput = (params = {}) => {
    let { index, destination } = params
    setInternalState({ [`show-${destination}-extra-point-${index}`]: false })
  }
  //deleting input field
  const deleteField = (params = {}) => {
    let { destination, index } = params
    setInternalState({
      [`${destination}-search-value-${index}`]: "",
      [`${destination}-points-error-${index}`]: "",
      [`collecting-${destination}-points-${index}`]: [],
      [`show-${destination}-extra-point-${index}`]: true,
    })
  }

  const outsideClick = ({ destination, index }) => {
    //it means if we have seggested points then it will work otherwise it is nt
    if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`]))
      setInternalState({ [`collecting-${destination}-points-${index}`]: [], })

  }


  const onChangeHandler = (params = {}) => {
    let { index, value, destination } = params
    let { passengerDetails: { token: passengerDetailsToken } } = reservations[0]

    //hinder user  to add some Characters
    if (ifHasUnwantedCharacters(value)) return

    setInternalState({ [`${destination}-search-value-${index}`]: value })

    if (value.length > 2) {
      (async () => {
        //set input loading to true
        setInternalState({ [`${destination}-search-loading-${index}`]: true })

        // 🔹 First request: ignoreGooglePlaces = true
        const log1 = await collectPointsAsync({ value, reducerSessionToken, language, env, ignoreGooglePlaces: true, errorMessage: "APL Quotations resuults component _collectPoints() catch block" });

        const { status, "session-token": sessionToken = "", token } = log1;


        if (status == 200) {
          setInternalState({ [`${destination}-search-loading-${index}`]: false })
          //  immediately show log1.result for fast feedback
          setInternalState({ [`collecting-${destination}-points-${index}`]: log1.result });
          //if we dont have passengerDetailsToken then save token on reservation objects;s passenger details
          if (!passengerDetailsToken) dispatch({ type: 'SET_TOKEN_TO_PASSENGERDETAILS', data: { token } })
          //check if session doesnt exist then  set session token to the reducer
          if (!reducerSessionToken) dispatch({ type: 'SET_SESSION_TOKEN', data: { sessionToken } });

          // 🔹 Second request: ignoreGooglePlaces = true
          const log2 = await collectPointsAsync({ value, reducerSessionToken, language, env, ignoreGooglePlaces: false });

          // Access the most up-to-date reservations (even inside stale closures)
          const selected = reservationsRef.current[index][`selected${destination === "pickup" ? "Pickup" : "Dropoff"}Points`] || [];

          if (selected.length === 0) {
            setInternalState({ [`collecting-${destination}-points-${index}`]: log2.result });
          }

        } else {
          setInternalState({ [`collecting-${destination}-points-${index}`]: {} })
          setInternalState({ [`${destination}-search-loading-${index}`]: false })
        }
      })()
    } else {
      //reset collecting points
      setInternalState({ [`collecting-${destination}-points-${index}`]: [] })
    }
  }
  return (
    <div
      className={`${styles.search_menu} ${isPickup ? styles.pickup_div : styles.dropoff_div} ${reservationError?.[errorKey]?.length > 0 &&
        !internalState[`${destination}-search-value-${index}`] &&
        selectedPoints.length === 0
        ? styles.error_input
        : ''
        }`}>
      {!selectedPoints.length > 0 ? <h4 className={direction}>{appData.words[headingKey]}</h4> : null}
      {selectedPoints.length > 0 ? (<h4 className={direction}>{appData.words[pointsTitleKey]}</h4>) : null}

      {selectedPoints.length > 0 && (<SelectedPointsOnHomePage env={env} index={index} destination={destination} points={selectedPoints} getQuotations={getQuotations} language={language} />)}

      {internalState[`show-${destination}-extra-point-${index}`] && selectedPoints.length > 0 && (
        <div className={`${styles.add_point_div} ${direction === 'rtl' && styles.addrtl}`} onClick={() => handleAddNewInput({ index, destination })}  >
          <i className={`fa-solid fa-plus ${styles.add_point_icon}`}></i>
          <p className={styles.add_point_text}>{appData?.words["strAddExtraPoint"]}</p>
        </div>
      )}

      <OutsideClickAlert onOutsideClick={() => outsideClick({ destination, index })}>
        <div className={styles.input_div}>
          {(selectedPoints.length === 0 || (!internalState[`show-${destination}-extra-point-${index}`] && selectedPoints.length > 0)) && (
            <input
              value={internalState[`${destination}-search-value-${index}`]}
              type="text" autoComplete="off" id="input_focused" placeholder={placeholder}
              onChange={(e) => onChangeHandler({ index, destination, value: e.target.value })} className={direction} />)}

          {internalState[`${destination}-search-loading-${index}`] && (
            <div className={styles.loading_div} direction={String(direction === 'rtl')}   >
              <SearchInputLoading />
            </div>
          )}

          {reservationError?.[errorKey]?.length > 0 && !internalState[`${destination}-search-value-${index}`] && selectedPoints.length === 0 && (
            <div className={styles.error_icon} direction={String(direction === 'rtl')}>
              <i title={reservationError?.[errorKey]} className="fa-solid fa-circle-exclamation"      ></i>
            </div>
          )}

          {!internalState[`show-${destination}-extra-point-${index}`] &&
            selectedPoints.length > 0 &&
            !internalState[`${destination}-search-loading-${index}`] && (
              <i onClick={() => deleteField({ destination, index })} direction={String(direction === 'rtl')} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}  ></i>
            )}

          {!Array.isArray(internalState[`collecting-${destination}-points-${index}`]) && (
            <HandleSearchResults
              env={env}
              getQuotations={getQuotations}
              language={language}
              index={index}
              destination={destination}
              setInternalState={setInternalState}
              collectingPoints={internalState[`collecting-${destination}-points-${index}`]}
            />
          )}
        </div>
      </OutsideClickAlert>
    </div>
  );
};

export default React.memo(QuotatıonInputHandleComponent);
