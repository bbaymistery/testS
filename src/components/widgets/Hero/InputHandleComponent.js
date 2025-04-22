import React from 'react';
import OutsideClickAlert from '../../elements/OutsideClickAlert';
import SelectedPointsOnHomePage from '../../elements/SelectedPointsOnHomePage';
import Loading from '../../elements/Loading';
import HandleSearchResults from '../../elements/HandleSearchResults';
import styles from "./styles.module.scss";
import { ifHasUnwantedCharacters } from '../../../helpers/ifHasUnwantedCharacters';
import { collectPointsAsync } from '../../../helpers/collectPoints';
import { useCallback } from 'react';

const HeroInputComponent = (props) => {

    let {
        points = [],
        destination = "pickup",
        direction, appData, env, index,
        language, internalState, reservationError,
        setInternalState, dispatch, reservations, reducerSessionToken, reservationsRef
    } = props

    const isPickup = destination === "pickup";

    const showExtraKey = `show-${destination}-extra-point-${index}`;
    const focusKey = `${destination}-search-focus-${index}`;
    const valueKey = `${destination}-search-value-${index}`;
    const loadingKey = `${destination}-search-loading-${index}`;
    const collectingKey = `collecting-${destination}-points-${index}`;
    const placeholderKey = appData?.words["seLocationPlaceholder"];
    const locationTitle = isPickup ? appData?.words["sePickUpLocation"] : appData?.words["seDropOffLocation"]
    const questionText = isPickup ? appData?.words["strFromWithQuestionMark"] : appData?.words["strWhereWithQuestionMark"];
    const pointTitleKey = isPickup ? appData?.words["strPickupPoints"] : appData?.words["strDropoffPoints"];
    const errorPoints = isPickup ? reservationError?.selectedPickupPoints : reservationError?.selectedDropoffPoints;

    const handleAddNewInput = (params = {}) => {
        let { index, destination } = params
        setInternalState({ [`show-${destination}-extra-point-${index}`]: false, [`${destination}-search-focus-${index}`]: true })
    }

    //deleting input field
    const deleteField = (params = {}) => {
        let { destination, index } = params
        setInternalState({
            [`${destination}-search-value-${index}`]: "",
            [`${destination}-search-focus-${index}`]: false,
            [`collecting-${destination}-points-${index}`]: [],
            [`show-${destination}-extra-point-${index}`]: true,
        })
    }
    const setFocusToInput = (params = {}) => {
        let { e, destination, index } = params
        if (window.innerWidth < 990) {
            e.target.style.opacity = 0
            let navbarElement = document.querySelector("#navbar_container")
            navbarElement.style.display = "none"
            const container = document?.querySelector(`#content${index}${destination}`);
            setTimeout(() => { e.target.style.opacity = 1 }, 150);
            setTimeout(() => { window.scroll({ top: container?.offsetTop, left: 0, behavior: "smooth", }); }, 100);
        }
        setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })

    }


    const closeModal = (params = {}) => {
        let { index, destination } = params
        document.body.style.overflow = "unset";
        let inputField = document.getElementById(`${destination}_input_focused_${index}`)
        inputField.style.opacity = 1
        setInternalState({ [`${destination}-search-focus-${index}`]: false, [`${destination}-search-value-${index}`]: "", [`collecting-${destination}-points-${index}`]: [] })
        let navbarElement = document.querySelector("#navbar_container");
        navbarElement.style.display = "flex";
    }

    const outsideClick = ({ destination, index }) => {
        //it means if we have seggested points then it will work otherwise it is nt
        if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`]))
            setInternalState({ [`collecting-${destination}-points-${index}`]: [], [`${destination}-search-focus-${index}`]: false })
    }


    const onChangeHanler = useCallback((params = {}) => {
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
                const log1 = await collectPointsAsync({ value, reducerSessionToken, language, ignoreGooglePlaces: true, env, errorMessage: "APL Hero component _collectPoints() catch block" });

                const { status, "session-token": sessionToken = "", token } = log1;


                if (status == 200) {
                    setInternalState({ [`${destination}-search-loading-${index}`]: false })

                    //  immediately show log1.result for fast feedback
                    setInternalState({ [`collecting-${destination}-points-${index}`]: log1.result });


                    //if we dont have passengerDetailsToken then save token on reservation objects;s passenger details
                    if (!passengerDetailsToken) dispatch({ type: 'SET_TOKEN_TO_PASSENGERDETAILS', data: { token } })
                    //check if session doesnt exist then  set session token to the reducer
                    if (!reducerSessionToken) dispatch({ type: 'SET_SESSION_TOKEN', data: { sessionToken } });
                    //!
                    // 🔹 Second request: ignoreGooglePlaces = true
                    const log2 = await collectPointsAsync({ value, reducerSessionToken, language, ignoreGooglePlaces: false, env, errorMessage: "APL Hero component _collectPoints() catch block ignoreGooglePlaces:false" });

                    //if the receveived value(log2.value) not accurate with what i send (value) update setInternalState destination search value to the log2.value
                    // - accurate seach value to me the value of suggestions resposne
                    if (log2.value !== value) {
                        setInternalState({ [`${destination}-search-value-${index}`]: log2.value })
                    }

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
    }, [reservations, dispatch, setInternalState, reducerSessionToken, language]);

    return (
        <div className={`${styles.search_menu} ${isPickup ? styles.first_column : styles.second_column}`}>
            {!points.length > 0 ? <p className={direction}>{locationTitle}</p> : null}
            {points.length > 0 ? <p className={`${styles.point_title} ${direction}`}>{pointTitleKey}</p> : null}

            {points.length > 0 && (<SelectedPointsOnHomePage env={env} index={index} destination={destination} points={points} language={language} />)}

            {internalState[showExtraKey] && points.length > 0 && (
                <div className={`${styles.add_point_div} ${direction}`} onClick={() => handleAddNewInput({ index, destination })}>
                    <i className={`fa-solid fa-plus ${styles.add_point_icon}`}></i>
                    <p className={styles.add_point_text}>{appData?.words["strAddExtraPoint"]}</p>
                </div>
            )}

            <OutsideClickAlert onOutsideClick={() => outsideClick({ destination, index })}>
                <div id={`content${index}${destination}`} d={`content${index}`} className={`${styles.input_div} ${styles['search-input-container']}`} f={String(internalState[focusKey])}  >
                    <div className={`${styles.popup_header} ${direction}`} f={String(internalState[focusKey])}>
                        <i
                            className={`fa-solid fa-xmark ${styles.close_icon}`}
                            onClick={() => closeModal({ index, destination })}
                        ></i>
                        <p className={direction}>{questionText}</p>
                    </div>

                    {(points.length === 0 || (!internalState[showExtraKey] && points.length > 0)) && (
                        <input
                            type="text"
                            autoComplete="off"
                            id={`${destination}_input_focused_${index}`}
                            placeholder={placeholderKey}
                            value={internalState[valueKey]}
                            autoFocus={internalState[focusKey]}
                            f={String(internalState[focusKey])}
                            onFocus={(e) => setFocusToInput({ e, destination, index })}
                            onChange={(e) => onChangeHanler({ index, destination, value: e.target.value })}
                            className={`${direction} ${errorPoints?.length > 0 && !internalState[valueKey] && points.length === 0 ? styles.error_input : ""}`}
                        />
                    )}

                    {internalState[loadingKey] && (
                        <div className={styles.loading_div} direction={String(direction === "rtl")}
                            popupp={String(internalState[focusKey])}>
                            <Loading />
                        </div>
                    )}

                    {errorPoints?.length > 0 && !internalState[valueKey] && points.length === 0 && (
                        <div className={styles.error_icon} popupp={String(internalState[focusKey])} direction={String(direction === "rtl")}>
                            <i title={errorPoints} className="fa-solid fa-circle-exclamation"></i>
                        </div>
                    )}

                    {!internalState[showExtraKey] && points.length > 0 && !internalState[loadingKey] && (
                        <i
                            onClick={() => deleteField({ destination, index })}
                            popupp={String(internalState[focusKey])}
                            direction={String(direction === "rtl")}
                            className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}
                        ></i>
                    )}

                    {!Array.isArray(internalState[collectingKey]) && (
                        <HandleSearchResults
                            env={env}
                            language={language}
                            index={index}
                            destination={destination}
                            setInternalState={setInternalState}
                            collectingPoints={internalState[collectingKey]}
                        />
                    )}
                </div>
            </OutsideClickAlert>
        </div>
    );
};

export default HeroInputComponent;