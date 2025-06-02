import React from 'react'
import styles from "./styles.module.scss"
const DangerouslyInnerHtml = ({ htmContent, }) => {
    return (
        <div className={styles.dangerous_div} dangerouslySetInnerHTML={{ __html: htmContent }}></div>
    )
}

export default DangerouslyInnerHtml