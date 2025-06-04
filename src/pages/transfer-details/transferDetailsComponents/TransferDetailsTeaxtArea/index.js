import styles from "./styles.module.scss"
import Textarea from '../../../../components/elements/Textarea'
/**
 * Renders a textarea component for special requests in transfer details
 * @param {Object} props - Component properties
 * @param {Object} props.appData - Application data containing localized text
 * @param {string} props.specialRequests - Current special requests text
 * @param {number} props.index - Index of the current transfer or request
 * @param {function} props.handleTextarea - Callback function to handle textarea changes
 * @returns {JSX.Element} Textarea component for special requests
 */
const TransferDetailsTeaxtArea = ({ appData, specialRequests, index, handleTextarea }) => {

    return (
        <div className={styles.textarea_div}>
            <Textarea label={appData?.words["strSpecialRequestsTitle"]} name="specialRequests" value={specialRequests} onChange={(e) => handleTextarea(e, index)} />
        </div>
    )
}

export default TransferDetailsTeaxtArea