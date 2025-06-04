/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "./styles.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSideBar } from "../../../store/showFieldReducer/showFieldSelectors";
import { SET_ACTIVELINK_ID, TOGGLE_SIDE_BAR } from "../../../store/showFieldReducer/showFieldTypes";
import { useRouter } from "next/router";
import { logoutuser } from "../../../store/authReducer/authAction";
import { getWindowDimensions } from "../../../helpers/windowDimension";
import OutsideClickAlert from "../../elements/OutsideClickAlert";
import DropDownAllCurrencies from "../../elements/DropDownAllCurrencies";

const TopBar = ({ pageUrl }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { params: { selectedCurrency } } = useSelector(state => state.pickUpDropOffActions)

  const selectToggleSideBar = useSelector(ToggleSideBar);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const menuRef = useRef(null);

  const isSpecialPage = ['/account-users', '/my-bookings', '/quotation', '/transfer-details', "/payment-details"].includes(pageUrl);
  
  const isMobile = windowDimensions.width < 990;
  const [languageStatus, setLanguageStatus] = useState(false)
  const [currencyStatus, setCurrencyStatus] = useState(false)
  const isCurrencyDisbaled = router.pathname === '/reservations-document' || router.pathname === "/transfer-details" || router.pathname === "/payment-details"

  const toggleSideBar = () => {
    menuRef.current.classList.toggle(styles.menuActive);
    dispatch({ type: TOGGLE_SIDE_BAR, payload: !selectToggleSideBar });
  };

  const setOpenCurrencyDropDown = () => {
    if (isCurrencyDisbaled) return
    setLanguageStatus(false)
    setCurrencyStatus(!currencyStatus)
  }

  const handleCurrency = (params = {}) => {
    let { e, text, currencyId } = params
    dispatch({ type: "SET_CURRENCY", data: { currencyId: +currencyId, text } })
    setCurrencyStatus(false)
  }

  //for language dropdown
  const outsideClickDropDown = useCallback((e) => {
    setLanguageStatus(false);
    setCurrencyStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageStatus, currencyStatus]);

  const logout = () => dispatch(logoutuser(router));

  const changeActiveLink = () => dispatch({ type: SET_ACTIVELINK_ID, payload: 1 });

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderAPLLogo = () => (
    <picture>
      <source srcSet="/logos/shortLogo2.webp" type="image/webp" />
      <img src="/logos/shortLogo2.webp" alt="APL Transfers Logo" />
    </picture>
  );

  const renderLogoText = () => (
    <p>
      <span>Airport Pickups London</span>
      <span>Agency Login</span>
    </p>
  );

  const renderFullLogo = (width = 290) => (
    // <Image src={logoImage1} alt="Agency Apl Transfers Logo" width={width} height={55} priority />
    //eslint-disable-next-line @next/next/no-img-element 
    <img src={'/logos/logo.webp'} alt="Agency Apl Transfers Logo" style={{ width: 240, height: '100%', }} />

  );

  const renderLeftLogo = () => {
    if (isMobile) {
      // ✅ Step 1: Mobile + Sidebar Closed
      if (selectToggleSideBar) {
        return (
          <div className={styles.close_navbar_brand_box} data="step1">
            <a href="/new-booking" onClick={changeActiveLink}>
              {renderAPLLogo()}
            </a>
          </div>
        );
      }
      // ✅ Step 2: Mobile + Sidebar Opened
      return (
        <div className={styles.navbar_brand_box} data="step2">
          <a href="/new-booking" onClick={changeActiveLink}>
            <span className={styles.logo_tag}>{renderFullLogo(280)}</span>
          </a>
        </div>
      );
    }

    // Desktop Mode
    if (!selectToggleSideBar) {
      // ✅ Step 3: Desktop + Sidebar Opened
      return (
        <div className={styles.navbar_brand_box} data="step3">
          <a href="/new-booking" onClick={changeActiveLink}>
            {isSpecialPage ? (
              <span className={`${styles.logo_tag} cursor_pointer`}>
                {renderFullLogo()}
              </span>
            ) : (
              <>
                {renderAPLLogo()}
                {renderLogoText()}
              </>
            )}
          </a>
        </div>
      );
    }

    // ✅ Step 4: Desktop + Sidebar Closed
    return (
      <div className={styles.navbar_brand_box} data="step4">
        <a href="/new-booking" onClick={changeActiveLink}>
          <span className={`${styles.logo_tag} cursor_pointer`}>
            {renderFullLogo()}
          </span>
          {/* <span>Home</span> */}
        </a>
      </div>
    );
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.navbar_header} id="navbar_container">
        <div className={styles.left}>
          {renderLeftLogo()}
          {isMobile && (
            <button type="button" id="vertical-menu-btn" onClick={toggleSideBar} className={`btn ${styles.visible_btn}`}   >
              <div ref={menuRef} className={styles.menu}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
              </div>
            </button>
          )}
        </div>

        {(!isMobile || selectToggleSideBar) && (
          <div className={styles.right}>
            <div className={`${styles.currency_dropdown}`} >
              <div
                className={`${styles.text}`}
                onClick={() => setOpenCurrencyDropDown()}
                data-name="currency"
                style={{
                  backgroundColor: isCurrencyDisbaled ? '#f0f0f0' : undefined,
                  cursor: isCurrencyDisbaled ? 'default' : 'pointer'
                }}
              >
                {selectedCurrency.currency}
              </div>

              {currencyStatus ?
                <OutsideClickAlert onOutsideClick={() => outsideClickDropDown()}>

                  <DropDownAllCurrencies currencyStatus={currencyStatus} handleCurrency={handleCurrency} />
                </OutsideClickAlert> : <></>}
            </div>
            <button className={`${styles.logout_button} btn`} onClick={logout}>
              <span>Logout</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
