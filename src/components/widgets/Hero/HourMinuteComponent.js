import React from 'react'
import styles from "./styles.module.scss"
import { hours, minutes } from '../../../constants/minutesHours'

/**
 * Renders a time selection component for hour and minute input
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onChangeSetDateTimeHandler - Callback function to handle time selection changes
 * @param {Array} props.selectedPickupPoints - Array of pickup points
 * @param {string} props.direction - Text direction (e.g., 'ltr' or 'rtl')
 * @param {Object} props.appData - Application data containing localized text
 * @param {number} props.index - Journey type index
 * @returns {JSX.Element} A time selection dropdown component
 */
const HourMinuteComponent = ({ onChangeSetDateTimeHandler, selectedPickupPoints, direction, appData, index,splitedHour,splitedMinute }) => {
    return (
        <div className={` ${styles.search_menu} ${styles.hours_minutes} ${styles.fourth_column}`}>
            <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingTime"] : appData?.words["sePickUpTime"]}</p>
            <div className={`${styles.select_time_div} ${direction}`}>
                {Array.from(new Array(2)).map((_, i) => {
                    return (
                        <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                            <label htmlFor={i}></label>
                            <i className={`fa-sharp fa-solid fa-angle-down ${direction === "rtl" ? styles.left : ""}`}></i>
                            <select
                                aria-label={i}
                                defaultValue={i === 0 ? splitedHour : splitedMinute}
                                onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })}
                            >
                                {/* //if index==0 thenhours will show up if not then minutes show up */}
                                {i === 0
                                    ? hours.map((hour) => (<option key={hour.id} id={hour.id + 50} value={hour.value}> {hour.value} </option>))
                                    : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                            </select>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default HourMinuteComponent