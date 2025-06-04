import SelectedPointsOnTransferDetails from '../../../../components/elements/SelectedPointsOnTransferDetails';
import styles from "./styles.module.scss"
/**
 * Renders selected pickup and dropoff points details for a manual quotation flow
 * @param {Object} props - Component properties
 * @param {number} props.index - Indicates journey type (0 for outbound, 1 for return)
 * @param {Array} props.selectedDropoffPoints - List of selected dropoff points
 * @param {Array} props.selectedPickupPoints - List of selected pickup points
 * @param {Object} props.reservationError - Errors related to point selections
 * @param {Object} props.appData - Application data containing localized words
 * @param {string} props.language - Current language setting
 * @param {string} props.env - Environment configuration
 * @returns {JSX.Element} Rendered component with pickup and dropoff point details
 */
const ManuelFlowSelectedPointsDetails = (props) => {
    let { index, selectedDropoffPoints, selectedPickupPoints, reservationError, appData, language, env } = props
    return (
        <div className={styles.selected_points_details}>
            <h2>   {index === 0 ? appData?.words["seGoingDetails"] : appData?.words["seReturnDetails"]}  </h2>
            <div className={styles.selecteditems} >
                <div className={`${styles.points} ${styles.selectedlist_points_left}`} >
                    <h3 className={styles.points_header}>{appData?.words["strSelectedPickUpPoint"]}</h3>
                    {/* //index =0 it is like destination pickup  */}
                    <SelectedPointsOnTransferDetails env={env} pointsError={reservationError['selectedPickupPoints']} selectedPoints={selectedPickupPoints} journeyType={index} type='pickup' language={language} />
                </div>
                {/* {  selectedlist_points_left     bunu aldk select komponentde kulandk} */}
                <div className={`${styles.points} ${styles.selectedlist_points_right}`}>
                    <h3 className={styles.points_header}>{appData?.words["strSelectedDropOffPoint"]}</h3>
                    {/* //index =1 it is like destination dropoff */}
                    <SelectedPointsOnTransferDetails env={env} pointsError={reservationError['selectedDropoffPoints']} selectedPoints={selectedDropoffPoints} journeyType={index} type='dropoff' language={language} />
                </div>
            </div>
        </div>
    )
}

export default ManuelFlowSelectedPointsDetails