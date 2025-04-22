import Link from 'next/link';
import React from 'react';
import styles from "./styles.module.scss";
import navigator from '../../../constants/navigatior';
import generalAllTranslations from '../../../constants/generalAllTranslations';

const MobileMenu = (({ handleClickNavLinkMobileMenuNotList, language, openMenu, }) => {
    return (
        <div className={`${styles.header_content_menu_mobile} ${openMenu ? styles.active_header_content_menu_mobile : ""} `}>
            <ul className={styles.menu_content_ul}>
                {navigator.map((item, index) => {
                    let { path, innerText,  strInnerText } = item
                    return (
                        <li key={path} id="navLink">
                            <Link
                                onClick={() => handleClickNavLinkMobileMenuNotList({ index })}
                                href={`${language === 'en' ? `${path}` : `${language}${path}`}`}
                                title={generalAllTranslations?.[strInnerText]?.[language]}
                                target={index === 4 ? "_blank" : ""}
                            >
                                <span>{generalAllTranslations?.[strInnerText]?.[language]}</span>
                            </Link>
                        </li>)
                })}
            </ul>
        </div>
    );
});

export default MobileMenu