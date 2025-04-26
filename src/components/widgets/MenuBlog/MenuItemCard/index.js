import React from 'react'
import styles from './styles.module.scss'

const MenuItemCard = ({ imageSrc, title, description, price }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imageSrc} alt={title} />
            </div>
            <h3 className={styles.title}>{title}</h3>

            {price && <div className={styles.price}>{price} ₼</div>}

            {description && <p className={styles.description}>
                {
            description
            }
            </p>}

            <button className={styles.addButton}>
                Səbətə əlavə et
            </button>
        </div>
    )
}

export default MenuItemCard;
