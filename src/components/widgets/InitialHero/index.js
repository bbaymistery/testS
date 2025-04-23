import React from 'react'
import styles from './styles.module.scss'
import ImageSlider from '../../elements/ImageSlider'
import { useSelector } from 'react-redux'
const InitialHero = () => {
  
  return (
    <div className={styles.page}>
      <ImageSlider />
    </div>
  )
}

export default InitialHero