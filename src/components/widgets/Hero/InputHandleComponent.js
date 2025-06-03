
import OutsideClickAlert from "../../elements/OutsideClickAlert";
import SearchInputLoading from "../../elements/SearchInputLoading";
import styles from "./styles.module.scss";
import { ifHasUnwantedCharacters } from '../../../helpers/ifHasUnwantedCharacters';
import { collectPointsAsync } from '../../../helpers/collectPoints';
import dynamic from 'next/dynamic';
import { useCallback } from "react";
const SelectedPointsOnHomePage = dynamic(() => import('../../elements/SelectedPointsOnHomePage'), { ssr: false, loading: () => <></> });
const HandleSearchResults = dynamic(() => import('../../elements/HandleSearchResults'), { ssr: false, loading: () => <></> });
const HeroInputComponent = (props) => {

    let {
        points = [],
        destination = "pickup",
        direction, appData, env, index,
        language, internalState, reservationError,
        setInternalState, dispatch, reservations, reducerSessionToken, reservationsRef
    } = props;
    const isPickup = destination === "pickup";
    const showExtraKey = `show-${destination}-extra-point-${index}`;
    const focusKey = `${destination}-search-focus-${index}`;
    const valueKey = `${destination}-search-value-${index}`;
    const loadingKey = `${destination}-search-loading-${index}`;
    const collectingKey = `collecting-${destination}-points-${index}`;
    const inputId = `${destination}_input_focused_${index}`;
    const containerId = `content${index}${destination}`;
    const errorPoints = reservationError?.[`selected${isPickup ? "Pickup" : "Dropoff"}Points`];

    const locationText = isPickup ? appData?.words["sePickUpLocation"] : appData?.words["seDropOffLocation"];
    const pointTitle = isPickup ? appData?.words["strPickupPoints"] : appData?.words["strDropoffPoints"];
    const questionText = isPickup ? appData?.words["strFromWithQuestionMark"] : appData?.words["strWhereWithQuestionMark"];
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

    };
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

    const outsideClick = ({ destination, index }) => {
        //it means if we have seggested points then it will work otherwise it is nt
        if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`]))
            setInternalState({ [`collecting-${destination}-points-${index}`]: [], [`${destination}-search-focus-${index}`]: false })
    }

    const closeModal = (params = {}) => {
        let { index, destination } = params
        document.body.style.overflow = "unset";
        let inputField = document.getElementById(`${destination}_input_focused_${index}`)
        inputField.style.opacity = 1
        setInternalState({ [`${destination}-search-focus-${index}`]: false, [`${destination}-search-value-${index}`]: "", [`collecting-${destination}-points-${index}`]: [] })
        let navbarElement = document.querySelector("#navbar_container");
        navbarElement.style.display = "block";
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
                const log1 = await collectPointsAsync({ value, reducerSessionToken, language, ignoreGooglePlaces: true, env, errorMessage: "ISTANBUL AGENCY WEBSITE Hero component _collectPoints() catch block" });

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
                    const log2 = await collectPointsAsync({ value, reducerSessionToken, language, ignoreGooglePlaces: false, env, errorMessage: "ISTANBUL AGENCY WEBSITE Hero component _collectPoints() catch block ignoreGooglePlaces:false" });

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservations, dispatch, setInternalState, reducerSessionToken, language]);


    return (
        <div className={styles.main_search_wrapper}>
            <div className={styles.icon_wrapper}>
                <i className='fa-solid fa-location-dot'></i>
            </div>
            <div className={styles.search_menu}>
                {!points.length ? <p >{locationText}</p> : null}
                {points.length ? <p className={`${styles.point_title} `}>{pointTitle}</p> : null}

                {points.length > 0 && <SelectedPointsOnHomePage env={env} index={index} destination={destination} points={points} language={language} />}

                {internalState[showExtraKey] && points.length > 0 && (
                    <div className={`${styles.add_point_div} `} onClick={() => handleAddNewInput({ index, destination })}>
                        <i className={`fa-solid fa-plus ${styles.add_point_icon}`}></i>
                        <p className={styles.add_point_text}>{appData?.words["strAddExtraPoint"]}</p>
                    </div>
                )}

                <OutsideClickAlert onOutsideClick={() => outsideClick({ destination, index })}>
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <div id={containerId} d={`content${index}`} className={`${styles.input_div} ${styles['search-input-container']}`} f={String(internalState[focusKey])}  >
                        {/* eslint-disable-next-line react/no-unknown-property */}
                        <div className={`${styles.popup_header} `} f={String(internalState[focusKey])}>
                            <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={() => closeModal({ index, destination })}></i>
                            <p >{questionText}</p>
                        </div>

                        {/* eslint-disable-next-line react/no-unknown-property */}
                        {(points.length === 0 || (!internalState[showExtraKey] && points.length > 0)) && (
                            <input
                                type="text"
                                autoComplete="off"
                                id={inputId}
                                placeholder={appData?.words["seLocationPlaceholder"]}
                                value={internalState[valueKey]}
                                autoFocus={internalState[focusKey]}
                                // eslint-disable-next-line react/no-unknown-property
                                f={String(internalState[focusKey])}
                                onFocus={(e) => setFocusToInput({ e, destination, index })}
                                onChange={(e) => onChangeHanler({ index, destination, value: e.target.value })}
                                className={` ${errorPoints?.length > 0 && !internalState[valueKey] && points.length === 0 ? styles.error_input : ""}`}
                            />
                        )}

                        {internalState[loadingKey] && (
                            // eslint-disable-next-line react/no-unknown-property
                            <div className={styles.loading_div} direction={String(direction === "rtl")} popupp={String(internalState[focusKey])}>
                                <SearchInputLoading position="absolute" />
                            </div>
                        )}

                      

                        {!internalState[showExtraKey] &&
                            points.length > 0 &&
                            !internalState[loadingKey] && (
                                // eslint-disable-next-line react/no-unknown-property
                                <i onClick={() => deleteField({ destination, index })} popupp={String(internalState[focusKey])} direction={String(direction === "rtl")} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}    ></i>)}

                        {!Array.isArray(internalState[collectingKey]) && (
                            <HandleSearchResults env={env} language={appData?.language} index={index} destination={destination} setInternalState={setInternalState} collectingPoints={internalState[collectingKey]} />
                        )}
                    </div>
                </OutsideClickAlert>
            </div>
        </div>
    );
};

export default HeroInputComponent;
