import  { useEffect, useRef } from "react";
import { useDispatch, } from "react-redux";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { BUTTON_TYPES } from "../Button/ButtonTypes";
const InfoModal = ({ content }) => {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  let clickedOutside = useOutsideClick(wrapperRef);

  useEffect(() => {
    if (clickedOutside) dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: false } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedOutside])

  const setToFalse = () => {
    dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: false } });
    document.body.style.overflow = "unset";
  };

  return (
    <div className={` ${styles.modal} `}>
      <div className={`${styles.modal_container}`} ref={wrapperRef} id="infoModal">
        <i onClick={setToFalse} className={`fa-solid fa-x ${styles.close_icon}`}></i>
        <p>{content?.length ? content : null}</p>
        <div>{typeof content === "object" ? content : null}  </div>
        <div className={styles.btn_div}>
          <Button onBtnClick={setToFalse} btnText="Close" type={BUTTON_TYPES.PRIMARY_OUTLINE} style={{ padding: "8px 12px", width: "120px" }} />
        </div>
      </div>

    </div>
  );
};

export default InfoModal;
