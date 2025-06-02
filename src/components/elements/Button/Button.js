import React from 'react'
import styles from "./styles.module.scss"
import { BUTTON_TYPES } from './ButtonTypes'



/**
 * Renders a button component with customizable styles and behavior.
 * 
 * @param {object} props - The props object containing button configuration.
 * @param {string} props.type - The type of button, which determines the CSS class applied.
 * @param {string} props.btnText - The text to be displayed on the button.
 * @param {React.ReactNode} props.icon - An optional icon to be displayed on the button.
 * @param {'LEFT' | 'RIGHT'} props.iconPos - The position of the icon relative to the button text.
 * @param {React.CSSProperties} props.style - Optional inline styles to be applied to the button.
 * @param {() => void} props.onBtnClick - A callback function to be executed when the button is clicked.
 * @param {boolean} props.disabled - Whether the button should be disabled and not clickable.
 * @returns {React.ReactElement} The rendered button component.
 */
const Button = (props) => {
    let { type, btnText, icon, iconPos, style, onBtnClick = () => { },disabled=false } = props
    const getButtonClass = () => {
        switch (type) {
            case BUTTON_TYPES.PRIMARY:
                return `${styles['btn-primary']} ${styles.button}`;
            case BUTTON_TYPES.PRIMARY_OUTLINE:
                return `${styles['btn-primary-outline']} ${styles.button}`;
            case BUTTON_TYPES.SECONDARY:
                return `${styles['btn-secondary']} ${styles.button}`;
            default:
                return `${styles['btn-tertiary']} ${styles.button}`;
        }
    }
    return (
        <button disabled={disabled} onClick={onBtnClick} style={style} className={`${getButtonClass()}`} >
            {icon && iconPos === 'LEFT' && icon}
            {btnText}
            {icon && iconPos === 'RIGHT' && icon}
        </button>
    )
}

export default Button