import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import wpImage from '../../../../public/social/WhatsAppp.webp';
import instaIamge from '../../../../public/social/Instigram.gif';
import tiktokImage from '../../../../public/social/tiktok.webp';
import websieImage from '../../../../public/social/weebsite.png';
import generalAllTranslations from "../../../constants/generalAllTranslations";
import Image from "next/image";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { params: { language, } } = useSelector(state => state.generalActions)

  return (
    <div className={`page ${styles.element_section_inside}`}>
      <div className={`page_section ${styles.section_inside}`}>
        <div className={`page_section_container ${styles.section_container_inside}`}>
          <div className={styles.boxes}>
            <div className={`${styles.box_one} ${styles.box}`}>
              <a className={styles.box_logo} href="/">
                Bestsushi.az
                <i className="fa-solid fa-heart"></i>
              </a>
              <p className={styles.box_desc}>
                Copyright © {currentYear}   Bestsushi.az
              </p>
            </div>
            <div className={`${styles.box} ${styles.box_two}`}>
              <p className={styles.text_wheat}> {generalAllTranslations.haveQuestions[language]}</p>
              <p className={styles.text_color}>
                <a href="tel:+994702027780">
                  +994 70 202 77 80
                </a>
              </p>
              <p className={styles.text_white}>
                {generalAllTranslations.support24[language]}
              </p>
            </div>
            <div className={`${styles.box} ${styles.box_three}`}>
              <p className={styles.text_wheat}> {generalAllTranslations.followOurTaste[language]} </p>
              <div className={styles.icons}>
                <a href="https://wa.me/994772027780" target="_blank" title="Bestsushi Whatsapp">
                  <Image src={wpImage} alt="Bestsushi Whatsapp" width={25} height={25} />
                </a>
                <a href="https://www.tiktok.com/@best.sushi" target="_blank" title="Bestsushi Tiktok page">
                  <Image src={tiktokImage} alt="Bestsushi Tiktok page" width={25} height={25} />
                </a>

                <a href="/" target="_blank" title="Bestsushi.az">
                  <Image style={{ filter: 'brightness(0) saturate(100%) invert(80%) sepia(43%) saturate(275%) hue-rotate(341deg) brightness(108%) contrast(92%)' }} src={websieImage} alt="Bestsushi.az" width={25} height={25} />
                </a>

                <a href="https://www.instagram.com/best_sushi6/" target="_blank" title="Bestsushi Instigram page">
                  <Image src={instaIamge} alt="Bestsushi Instigram page" width={25} height={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
