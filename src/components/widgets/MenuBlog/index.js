import React from 'react'
import styles from "./styles.module.scss"
import Categories from './Categories'

const MenuBlog = () => {
    return (
        <div className={`page ${styles.menublog}`}>
            <div className={`page_section ${styles.menublog_section}`}>
                <div className={`page_section_container ${styles.menublog_section_container}`}>
                    {/* cataloglarin adlari duzulumu */}
                    <Categories />

                    {/* catogerilerin acilimi */}
                </div>
            </div>
        </div>
    )
}

export default MenuBlog