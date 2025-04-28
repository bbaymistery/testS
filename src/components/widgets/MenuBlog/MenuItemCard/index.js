import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import generalAllTranslations from '../../../../constants/generalAllTranslations';
import { useDispatch, useSelector } from 'react-redux';
const MenuItemCard = ({ imageSrc, title, description, price, ingredients, quantity, language, porsiya = false, item }) => {
    const { sebet, totalPriceOfSebet } = useSelector(state => state.generalActions);

    const dispatch = useDispatch();
    const addToSebet = () => {
        dispatch({ type: 'UMUMI_SEBETE_EKLE', data: { product: { ...item, total: 0, quantityItem: 1, } } });
    };
    const removeFromSebet = (id) => {
        dispatch({ type: 'DELETE_FROM_THE_SEBET', data: { id } });
    };
    const isItemInSebet = sebet.find(sebetItem => sebetItem.id === item.id && sebetItem.isExist);

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


            {isItemInSebet ? <button className={styles.removeSebet} onClick={() => removeFromSebet(item.id)} >
                {generalAllTranslations["strSebetdenCixart"]?.[language]}
            </button> : <button className={styles.addButton} onClick={() => addToSebet()} >
                {generalAllTranslations["strSebeteElaveEt"]?.[language]}
            </button>}
        </div >
    )
}

export default MenuItemCard;
