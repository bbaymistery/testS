import { useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { BUTTON_TYPES } from "../Button/ButtonTypes";
import currencies from "../../../constants/currencies";
import moment from "moment-timezone";
import { collectQuotationsAsync } from "../../../helpers/getQuotations";
import { getPriceDetailsFromQuotation } from "../../../helpers/getPriceDetailsFromQuotation";

const PaymentMethods = (props) => {
  let { env, } = props

  const router = useRouter()
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { journeyType, selectedCurrency, tokenForArchieve }, reservations, } = state

  const [accountPaymentStatus, setAccountPaymentStatus] = useState(false)
  const updatedReservationsRef = useRef(reservations); // ilk değeri mevcut reservations

  const checkQuotationPriceUpdatedOrNot = async () => {
    const now = moment().tz("Europe/London");
    let updatedReservations = [...reservations];

    for (let index in updatedReservations) {
      const obj = updatedReservations[index];
      const { transferDetails, quotation: previousQuotation } = obj;
      const { transferDateTimeString } = transferDetails;

      const transferTime = moment.tz(transferDateTimeString, "YYYY-MM-DD HH:mm", "Europe/London");

      if (transferTime.isBefore(now)) {
        alert("Transfer time for reservation is in the past. Redirecting to home page.");
        router.push("/");
        return null;
      }
      let newQuotationsResponse = { status: 400 }
      let newQuotations = {}
      let newQuotationOptions = []
      //normal quotation api request again
      if (+previousQuotation.qtype === 1 || previousQuotation.qtype === 2) {
        newQuotationsResponse = await collectQuotationsAsync({ reservations, journeyType, env ,currencyId: selectedCurrency.currencyId});
        if (newQuotationsResponse.status === 200) {

          newQuotations = newQuotationsResponse.data[index] || {}
          newQuotationOptions = (newQuotations || {}).quotationOptions || []
        }
      }


      console.log({ newQuotationsResponse });


      if (newQuotationsResponse.status === 200) {
        const newQuotation = newQuotationOptions.find(item => item.carId === previousQuotation.carId);
        console.log({ newQuotation });

        if (newQuotation && typeof newQuotation.normalPrice === 'number' && !isNaN(newQuotation.normalPrice)) {

          let prevQuotationDetails = getPriceDetailsFromQuotation({ 'quotation': previousQuotation, qtype: previousQuotation.qtype }).data || {};
          let newQuotationDetails = getPriceDetailsFromQuotation({ 'quotation': newQuotation, qtype: newQuotation.qtype }).data || {};
          console.log({
            prevQuotationDetails,
            newQuotationDetails
          });
          console.log({
            prevQuotationDetailsPrice: newQuotationDetails.price,
            newQuotationDetailsPrice: prevQuotationDetails.price
          });
          if (newQuotationDetails.price !== prevQuotationDetails.price) {
            console.log("dsssssssssssssssss");

            dispatch({ type: "GET_QUOTATION", data: { results: newQuotationsResponse, journeyType } });
            dispatch({ type: "SET_QUOTATION_ON_SPECIAL_CASE", data: { quotation: newQuotation, journeyType: index } });
          }

        }
        updatedReservations[index] = {
          ...updatedReservations[index],
          quotation: newQuotation,
        };
        console.log({ updatedReservations });

      }
    }
    return updatedReservations
  }
  const fetchArchieveToken = async (params = {}) => {
    let { token, paymentType, stage, updatedReservations } = params

    let reservationObj = updatedReservations

    if (parseInt(journeyType) === 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          paymentDetails:
          {
            ...reservationObj[0].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        },
        {
          ...reservationObj[1],
          paymentDetails:
          {
            ...reservationObj[1].paymentDetails,
            token: token, paymentType: paymentType,
          },
        }
      ]
    } else {
      reservationObj = [{ ...reservationObj[0], paymentDetails: { ...reservationObj[0].paymentDetails, token: token, paymentType: paymentType, }, },]
    }
    const method = "POST"
    const url = `${env.apiDomain}/api/v1/sessions/add`;
    const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage })
    const headers = { "Content-Type": "application/json" }
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();
    console.log({ data, stage });

  };
  //this function triggering modal status of cash payment
  const setAccountModal = () => setAccountPaymentStatus(true)

  const accountMethod = (params = {}) => {
    let { token, paymentType, updatedReservations } = params
    fetchArchieveToken({ token: "", paymentType: "", stage: "CLICK_OVER_ACCOUNT_PAYMENT", updatedReservations })
    dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token, paymentType } })
    router.push("/reservations-document")

  }
  //this function includes all the methods of payments
  const startPayment = async (id) => {
    const updatedReservations = await checkQuotationPriceUpdatedOrNot(); // güncel hali getir
    updatedReservationsRef.current = updatedReservations; // ⬅️ ref’e ata

    if (id === 4) accountMethod({ token: "", paymentType: id, updatedReservations })
  }

  const totalPrice = useMemo(() => {

    if (parseInt(journeyType) === 0) {
      const q = reservations[0]?.quotation;
      return q?.exchangedPrice ?? q?.price;
    }

    const prices = reservations.map(r => r?.quotation?.exchangedPrice ?? r?.quotation?.price);
    return prices.reduce((sum, p) => sum + parseInt(p || 0), 0);
  }, [journeyType, reservations]);

  const symbol = currencies.find(c => c.currencyId === +selectedCurrency.currencyId)?.symb || "£";


  return (
    <>
      <div className={`${styles.payment_details}`}>
        <div className={styles.header} >
          <div className={styles.header_tot_price} >
            <p className={styles.header_tot_price_text}>total price</p>
            <span className={styles.header_tot_price_price}>
              {symbol} {totalPrice}
            </span>
          </div>

          <div className={styles.header_bottom}>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img onClick={() => setAccountModal()} className={styles.acceptedcards_img} border="0" alt="Book Now for Airport Pickups London " src="/images/boooknow.png" />

          </div>
          {accountPaymentStatus ?
            <div className={`${styles.content_modal} ${styles.appear}`}>
              <div className={`${styles.confirmation_box} `}>
                <div className={styles.header}>
                  <p>{"Confirmation"}</p>
                  <i onClick={() => setAccountPaymentStatus(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className={styles.body}>
                  <p>{"You have chosen to pay by account"}.</p>
                </div>
                <div className={styles.footer}>
                  <button onClick={() => startPayment(4)} className="btn btn_primary"> Book Now</button>
                </div>
              </div>
            </div>
            : <></>}
        </div>
        <div className={styles.button}>

          <div onClick={() => router.back()}>
            <Button type={BUTTON_TYPES.PRIMARY_OUTLINE} style={{ padding: "10px 28.5px", }} btnText={`Back`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
