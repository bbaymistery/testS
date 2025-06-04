import styles from  "./styles.module.scss"
import { BUTTON_TYPES } from '../../../../components/elements/Button/ButtonTypes'
import Button from '../../../../components/elements/Button/Button'
/**
 * Renders a back and next button component for transfer details with directional support
 * @param {Object} props - Component properties
 * @param {string} props.direction - Layout direction ('rtl' or 'ltr')
 * @param {Object} props.router - Router object for navigation
 * @param {Object} props.appData - Application data containing localized text
 * @param {Function} [props.checkValidation=()=>{}] - Optional validation function for next button
 * @returns {JSX.Element} Back and next buttons with configurable styling and behavior
 */
const TransferDetailsBackNextButton = (props) => {
    let { direction, router, appData, checkValidation=()=>{} } = props
  return (
    <div className={` ${direction === 'rtl' ? styles.directionbuttons : styles.buttons}`} >
    <div className={styles.left}>

        <div onClick={() => router.back()}>
            <Button type={BUTTON_TYPES.PRIMARY_OUTLINE}  btnText={`${appData?.words["strGoBack"]}`} />
        </div>


        <div onClick={(e) => checkValidation(e)}>
            <Button type={BUTTON_TYPES.PRIMARY_OUTLINE}  btnText={`${appData?.words["strNext"]}`} />
        </div>
    </div>

</div>
  )
}

export default TransferDetailsBackNextButton