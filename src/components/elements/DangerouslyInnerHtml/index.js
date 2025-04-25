import React from 'react'
import styles from "./styles.module.scss"
const DangerouslyInnerHtml = ({ htmlContent, }) => {
    
    return (
        <div className={styles.dangerous_div} dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    )
}

export default DangerouslyInnerHtml