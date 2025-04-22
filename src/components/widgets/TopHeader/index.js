import React, { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../store/store";
import { useRouter } from "next/router";
// import { extractLanguage } from "../../../helpers/extractLanguage";
// import OutsideClickAlert from "../../elements/OutsideClickAlert";
import dynamic from 'next/dynamic'
// import { setCookie } from "../../../helpers/cokieesFunc";
import logoImage from '../../../../public/logos/logo.webp'

import airportTranslations from "../../../constants/generalTranslataions";
// import DropDownAllCurrencies from "../../elements/DropDownAllCurrencies";

// const DropDownAllLanguages = dynamic(() => import('../../elements/DropDownAllLanguages'),);
// const MobileMenu = dynamic(() => import('../../elements/MobileMenu'),);
import DesktopMenu from "../../elements/DesktopMenu";
import MobileMenu from "../../elements/MobileMenu";
const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [openMenu, setOpenMenu] = useState(false) //mobile
  const [languageStatus, setLanguageStatus] = useState(false)
  const [currencyStatus, setCurrencyStatus] = useState(false)
  const { params: { language, } } = useSelector(state => state.generalActions)

  const handleLanguage = async (params = {}) => {
    // let { e, text, key, direction, index } = params
    // setCookie("lang", key, 7);
    // dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: key, direction, langIndex: index } })
    // //url configuration based on language we select
    // let checkTheUrlIfLangExist = extractLanguage(router.asPath) //tr es or it
    // //to be sure that selected language is exist among languages or not
    // let hasEn = appData?.languages.some((language) => language.value === checkTheUrlIfLangExist);
    // if (checkTheUrlIfLangExist && hasEn) {
    //   //if length is 3 it means we r in the taxi deaals
    //   let replacedString = `${key === "en" ? "" : key}${router.asPath.length === 3 ? "" : "/"}`

    //   let url = router.asPath.replace(/^\/([a-z]{2})\/?/i, replacedString)
    //   //tr|it|sp/transfer-details...  replacing withh
    //   url = key === 'en' ? `${url}` : `/${url}`

    //   router.push(url);
    // }
    // else {
    //   //then when ever i change language i will add tr it ar
    //   //if it is english then  we dont need lang atrribute=>>>>>     /transfer-details...
    //   let url = `/${key === "en" ? "" : key}${router.asPath}`
    //   router.push(url);
    // }
    // //make hidden language dropdown in mobile menu After clicking
    // setLanguageStatus(!languageStatus)

  }

  const handleCurrency = (params = {}) => {
    let { e, text, currencyId } = params
    dispatch({ type: "SET_CURRENCY", data: { currencyId: +currencyId, text } })
    setCurrencyStatus(false)
  }

  const toggleMenu = () => setOpenMenu(!openMenu)

  //for language dropdown
  const outsideClickDropDown = useCallback((e) => {
    setLanguageStatus(false);
    setCurrencyStatus(false);
  }, [languageStatus, currencyStatus]);


  //when we click lang text it opens dropdown
  const setOpenLanguageDropdown = () => {
    setCurrencyStatus(false)
    setLanguageStatus(!languageStatus)

  }
  const setOpenCurrencyDropDown = () => {
    setLanguageStatus(false)
    setCurrencyStatus(!currencyStatus)
  }



  const handleClickNavLinkMobileMenuNotList = ({ index }) => {
    if (index === 0) {
      dispatch({ type: "RESET_SELECTED_POINTS", data: { journeyType } });
      dispatch({ type: "SET_NAVBAR_TAXI_DEALS", data: { hasTaxiDeals: "heathrow" } });
    }
    toggleMenu();
  }
  return (
    <header className={styles.header} id="navbar_container" >
      <div className={styles.header_container}>
        <div className={styles.header_flex_div}>
          <div className={styles.left_items}>
            <div className={styles.left_items_flex_div}>
              <a href={language === 'en' ? '/' : `/${language}`} className={`${styles.logo_tag}`}  >
                <Image src={logoImage} alt="APL transfers" width={255} height={70} priority />
              </a>
              <DesktopMenu airportTranslations={airportTranslations} journeyType={0} language={language} />
              {/* mobile  */}
              {openMenu ?
                <MobileMenu
                  airportTranslations={airportTranslations}
                  openMenu={true}
                  handleClickNavLinkMobileMenuNotList={handleClickNavLinkMobileMenuNotList}
                  language={language}
                />
                : <></>}
            </div>
          </div>

          <div className={styles.right_items}>

            <div className={`${styles.currency_dropdown}`} >
              <div className={styles.text} onClick={setOpenCurrencyDropDown} data-name="currency">
                {/* {selectedCurrency.currency} */}
              </div>
              {/* {currencyStatus ?
                <OutsideClickAlert onOutsideClick={outsideClickDropDown}>
                  <DropDownAllCurrencies currencyStatus={currencyStatus} handleCurrency={handleCurrency} />
                </OutsideClickAlert> : <></>} */}
            </div>

            <div className={`${styles.language_dropdown}`} >
              <div className={styles.img_div} onClick={setOpenLanguageDropdown} data-name="language">
                <Image src={`/languages/${language}.gif`} width={20} height={11} priority alt={language} data-name="language" />
              </div>
              {/* {languageStatus ?
                <OutsideClickAlert onOutsideClick={outsideClickDropDown}>
                  <DropDownAllLanguages languageStatus={languageStatus} handleLanguage={handleLanguage} />
                </OutsideClickAlert> : <></>} */}
            </div>

            <div onClick={toggleMenu} className={`${styles.menu}`} id="menu">
              {!openMenu ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
