import { useRouter } from 'next/router';
import React from 'react';
import styles from "./styles.module.scss";
import generalAllTranslations from '../../../constants/generalAllTranslations';
import navigator from '../../../constants/navigatior';
const DesktopMenu = ({ language, }) => {
    const router = useRouter()
    return (
        <div className={styles.header_menu_content}>
            <ul>
                {navigator.map((item, index) => {
                    let { path, strInnerText } = item
                    let title = generalAllTranslations?.[strInnerText]?.[language]
                    // let href = language === 'az' ? '/' : `/${language}`
                    let href=language === 'az' ? `${path}` : `/${language}${path}`
                    let active = router.pathname === path ? styles.active : ""

                    return (
                        <li key={index}>
                            <a href={href} title={title} className={active} >
                                <span>{generalAllTranslations?.[strInnerText]?.[language]}</span>
                            </a>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default DesktopMenu