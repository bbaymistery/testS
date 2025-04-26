import React, { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../store/store";
import { useRouter } from "next/router";
import { extractLanguage } from "../../../helpers/extractLanguage";
import OutsideClickAlert from "../../elements/OutsideClickAlert";
import { setCookie } from "../../../helpers/cokieesFunc";
import logoImage from '../../../../public/logos/pandalogo.webp'
import airportTranslations from "../../../constants/generalAllTranslations";
import DesktopMenu from "../../elements/DesktopMenu";
import DropDownAllLanguages from "../../elements/DropDownAllLanguages";
import MobileMenu from "../../elements/MobileMenu";
import websiteLanguagesWithInnerText from "../../../constants/languages";
import SideBar from "../SideBar";
const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false) //mobile
  const [languageStatus, setLanguageStatus] = useState(false)
  const { params: { language, } } = useSelector(state => state.generalActions)

  const handleLanguage = async (params = {}) => {
    const { key, direction, index } = params;

    // 🍪 1. Yeni dili cookie'ye kaydet (7 gün boyunca saklanacak)
    setCookie("lang", key, 7);

    // 🔁 2. Redux'a yeni dili ve yön bilgilerini gönder
    dispatch({ type: "SET_NEW_LANGUAGE", data: { languageKey: key, direction, langIndex: index } });

    // 🌐 3. Mevcut URL'den dili çıkart (örn. "/tr/abc" → "tr")
    const checkTheUrlIfLangExist = extractLanguage(router.asPath);

    // ✅ 4. Çıkan dil gerçekten sistemde kayıtlı mı (bazı sayfalar hatalı olabilir)
    const hasLang = websiteLanguagesWithInnerText.some((lang) => lang.value === checkTheUrlIfLangExist);

    if (checkTheUrlIfLangExist && hasLang) {
      // 🔁 5. Eğer URL zaten dil içeriyorsa onu yeni dil ile değiştir
      const replacedPrefix = `${key === "en" ? "" : key}${router.asPath.length === 3 ? "" : "/"}`;
      let url = router.asPath.replace(/^\/([a-z]{2})\/?/i, replacedPrefix);

      // Eğer yeni dil "en" değilse başa yeniden slash ekle
      url = key === "en" ? url : `/${url}`;

      router.push(url); // 🌍 Yeni URL'ye yönlendirme
    } else {
      // 🆕 Eğer URL'de önceki bir dil yoksa → direkt yeni dili ekle
      const url = `/${key === "en" ? "" : key}${router.asPath}`;
      router.push(url);
    }
    // 📱 Mobil menüdeki dil dropdown'unu gizle
    setLanguageStatus(false);
  };



  const toggleMenu = () => setOpenMenu(!openMenu)

  //for language dropdown
  const outsideClickDropDown = () => setLanguageStatus(false);

  //when we click lang text it opens dropdown
  const setOpenLanguageDropdown = () => setLanguageStatus(!languageStatus)



  return (
    <header className={styles.header} id="navbar_container" >
      <div className={styles.header_container}>
        <div className={styles.header_flex_div}>
          <div className={styles.left_items}>
            <div className={styles.left_items_flex_div}>
              <a href={language === 'en' ? '/' : `/${language}`} className={`${styles.logo_tag}`}  >
                <Image src={logoImage} alt="Best Sushi" width={240} height={50} priority />
                <span className={styles.wave_text}>
                  {"BestSushi".split("").map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.1}s` }} className={styles.wave_letter}>
                      {char}
                    </span>
                  ))}
                </span>
              </a>

              <DesktopMenu airportTranslations={airportTranslations} journeyType={0} language={language} />
              {/* mobile  */}
              {openMenu &&
                <MobileMenu airportTranslations={airportTranslations} openMenu={openMenu} language={language} />}
            </div>
          </div>

          <div className={styles.right_items}>
            <div className={`${styles.language_dropdown}`} >
              <div className={styles.img_div} onClick={setOpenLanguageDropdown} data-name="language">
                <Image src={`/languages/${language}.gif`} width={20} height={11} priority alt={language} data-name="language" />
              </div>
              {languageStatus ?
                <OutsideClickAlert onOutsideClick={outsideClickDropDown}>
                  <DropDownAllLanguages languageStatus={languageStatus} handleLanguage={handleLanguage} />
                </OutsideClickAlert> : <></>}
            </div>

            <div onClick={toggleMenu} className={`${styles.menu}`} id="menu">
              {!openMenu ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
            </div>
            <SideBar />

          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
