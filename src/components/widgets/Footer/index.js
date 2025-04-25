import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import generalAllTranslations from "../../../constants/generalAllTranslations";
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
                <i class="fa-solid fa-heart"></i>
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
              <p className={styles.text_white}>E-Mail</p>
              <p>
                <a href="mailto:info@london-heathrow.taxi" className={styles.text_color}>
                  info@london-heathrow.taxi
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
