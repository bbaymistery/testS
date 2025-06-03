import styles from "./styles.module.scss"
import { hours, minutes } from '../../constants/minutesHours'
const HourMinute = ({ onChangeSetDateTimeHandler, appData, selectedPickupPoints, splitedHour, splitedMinute ,index}) => {
    return (
        <div className={`${styles.select_time_div} `}>
            {Array.from(new Array(2)).map((arr, i) => {
                return (<div key={i} className={styles.booking_form_hour_minute_wrapper}>
                    <label htmlFor="time-select">
                        {i === 0
                            ? `${selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["strLandingHour"] : appData?.words["strPickUpHour"]}`
                            : `${selectedPickupPoints[0]?.pcatId === 1 ? appData?.words["strLandingMinute"] : appData?.words["strPickUpMinute"]} `
                        }
                    </label>
                    <select
                        id="time-select"
                        defaultValue={i === 0 ? splitedHour : splitedMinute}
                        onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                        {/* //if index==0 thenhours will show up if not then minutes show up */}
                        {i === 0 ?
                            hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}> {hour.value} </option>))
                            :
                            minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value} >{minute.value} </option>))}
                    </select>
                </div>)
            })}
        </div>
    )
}

export default HourMinute