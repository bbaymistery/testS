import styles from "./styles.module.scss"
import { hours, minutes } from '../../../constants/minutesHours'
const HourMinuteComponent = ({ onChangeSetDateTimeHandler, selectedPickupPoints, direction, appData, index,splitedHour,splitedMinute }) => {
    return (
        <div className={styles.main_search_wrapper}>
            <div className={styles.icon_wrapper}>
                <i className="fa-solid fa-clock"></i>
            </div>

            <div className={` ${styles.search_menu} ${styles.hours_minutes} `}>
                <p className={direction}>{selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["seLandingTime"] : appData?.words["sePickUpTime"]}</p>
                <div className={`${styles.select_time_div} ${direction}`}>
                    {Array.from(new Array(2)).map((arr, i) => {
                        return (
                            <div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                <label htmlFor={i}></label>
                                <select
                                    aria-label={i}
                                    defaultValue={i === 0 ? splitedHour : splitedMinute}
                                    onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                                    {i === 0
                                        ? hours.map((hour) => (<option key={hour.id} id={hour.id + 50} value={hour.value}> {hour.value} </option>))
                                        : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                                </select>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default HourMinuteComponent