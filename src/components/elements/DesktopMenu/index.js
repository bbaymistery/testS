import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { generalAllTranslations } from '../../../constants/generalTranslataions';
import { navigator } from '../../../constants/navigatior';
import styles from "./styles.module.scss";
const DesktopMenu = ({ language, }) => {
    const router = useRouter()
    return (
        <div className={styles.header_menu_content}>
            <ul>
                {navigator.map((item, index) => {
                    let { path, type, strInnerText } = item
                    return (
                        <li key={index} className={`${styles.li_item} ${type === "list" ? styles.has_children : ""}`}>
                            <a href={language === 'az' ? '/' : `/${language}`} title={generalAllTranslations?.[strInnerText]?.[language]} className={`${path.length ? styles.nocursor : ""} ${router.pathname === path ? styles.active : ""}`} >
                                <span>{generalAllTranslations?.[strInnerText]?.[language]}</span>
                                <br />
                            </a>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default DesktopMenu