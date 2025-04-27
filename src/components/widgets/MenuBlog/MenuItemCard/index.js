import React from 'react'
import styles from './styles.module.scss'
import generalAllTranslations from '../../../../constants/generalAllTranslations';

const MenuItemCard = ({ imageSrc, title, description, price, ingredients, quantity, language, porsiya = false }) => {
    console.log(description);

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imageSrc} alt={title} />
            </div>
            <h3 className={styles.title}>{title}</h3>

            {price && <div className={styles.price}>
                {quantity && <div className={styles.quantity}>
                    {
                        porsiya ?
                            `1 ${generalAllTranslations["strPorsiya"][language]}` :
                            `${quantity} ${generalAllTranslations["strPieceWordTranslations"][language]}`
                    }
                </div>}
                {price} ₼
            </div>}

            {/* Yeni: İçindekiler listesi */}
            {ingredients?.length > 0 && (
                <ul className={styles.ingredients}>
                    {ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
            {description && <p className={styles.description}>{description}</p>}


            <button className={styles.addButton}>
                Səbətə əlavə et
            </button>
        </div>
    )
}

export default MenuItemCard;
