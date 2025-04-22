import React from 'react'
import styles from "./styles.module.scss"
const Header = () => {
  return (
    <div className={`${styles.hero } page`} >
      <div className={`${styles.hero_section} page_section`}>
        <div className={`${styles.hero_section_container} page_section_container`}>
          test me
        </div>
      </div>
    </div>
  )
}

export default Header