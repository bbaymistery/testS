import React from 'react'
import { currentDate } from '../../../helpers/getDates'
import styles from "./styles.module.scss"
/**
 * Renders a date input component for selecting journey dates with support for RTL and LTR directions.
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onChangeSetDateTimeHandler - Callback for handling date changes
 * @param {boolean} props.islinknamecomponent - Flag to modify icon styling
 * @param {string} props.splitedDate - Initial selected date
 * @param {number} props.index - Journey index for determining min date
 * @param {Array} props.selectedPickupPoints - Pickup points for determining date label
 * @param {string} props.direction - Text direction (rtl/ltr)
 * @param {Object} props.appData - Application data for localization
 */
const InputDateComponent = ({ islinknamecomponent, splitedDate, index, selectedPickupPoints, direction, appData, onChangeSetDateTimeHandler, reservations },) => {

    return (
        <div className={`${styles.search_menu} ${styles.book_input_date} ${styles.third_column}`}>
            <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingDate"] : appData?.words["sePickUpDate"]}</p>
            <div className={`${styles.date_div} ${direction === 'rtl' && styles.date_div_rtl}`}>
                <input
                    aria-label="date"
                    type="date"
                    name="pickup-date"
                    className={direction === "rtl" ? styles.rtl : ""}
                    value={splitedDate}
                    min={index === 0 ? currentDate() : reservations[0].transferDetails.transferDateTimeString.split(" ")[0]}
                    onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                />
            </div>
            <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon} ${islinknamecomponent ? styles.date_picker_icon_on_linkame : ""}`}></i>
        </div>
    )
}

export default InputDateComponent