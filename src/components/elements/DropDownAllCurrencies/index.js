import styles from "./styles.module.scss"
import currencies from '../../../constants/currencies'
const DropDownAllCurrencies = ({ currencyStatus, handleCurrency }) => {


    return (
        <div className={styles.all_currrencies} style={{ opacity: `${currencyStatus ? 1 : 0}`, visibility: `${currencyStatus ? "visible" : "hidden"}` }} >
            {currencies.map((item, _) => {
                let { currency: text, currencyId } = item
                return (
                    <div className={styles.content} name={text} key={currencyId} onClick={(e) => handleCurrency({ e, text, currencyId })}>
                        <span>{text}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default DropDownAllCurrencies