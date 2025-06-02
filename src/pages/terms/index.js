/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import { getWindowDimensions } from '../../helpers/windowDimension';
import { SET_ACTIVELINK_ID } from '../../store/showFieldReducer/showFieldTypes';
import DangerouslyInnerHtml from "../../components/elements/DangerouslyInnerHtml";
import styles from "./styles.module.scss"
import { parseCookies } from '../../helpers/cokieesFunc';
let htmlContent={
        en: `
        <h1>Booking Terms & Conditions - APL Transfers Türkiye</h1>
    <h2>1. Quotations, Rates, and Charges</h2>
    <p>1.1 All prices are displayed in Euro (EUR), British Pound (GBP), US Dollar (USD), or Turkish Lira (TRY) and include applicable taxes. Customers can select their preferred currency at the time of booking. The total amount will be calculated based on the selected currency.</p>
    <p>1.2 APL Transfers operates 24/7. Our contact details are:</p>
    <div>
        <p>📞 24/7 Contact: +90 216 550 33 13</p>
        <p>🌍 From Europe: +44 203 325 9878</p>
        <p>📱 WhatsApp: +44 73 8790 1028</p>
        <p>✉ Email: info@apltransfers.com</p>
    </div>
    <p>1.3 All quotations are valid for 30 days and include standard airport meet & assist, 60 minutes free waiting time, and parking or tolls. Gratuities are at the customer’s discretion.</p>
    <h2>2. Free Meet & Greet & Waiting Time</h2>
    <h3>2.1 Airport Pick-up Waiting Time Policy</h3>
    <p>APL Transfers provides 60 minutes of free waiting time for all airport pickups from the requested pickup time. If additional waiting time is required beyond this, a €10 / £10 / $10 per 60 minutes charge applies.</p>
    <h3>2.2 Meeting Points at Major Airports in Türkiye</h3>
    <ul>
        <li><strong>Istanbul Airport (IST):</strong> We have a CIMLA - APL Transfer office inside Istanbul Airport.
            <ul>
                <li>After collecting your luggage, proceed through Customs.</li>
                <li>Once you enter the Arrival Hall, turn right, where you will find the Taxi Transfer Offices.</li>
                <li>Our office is located on your left-hand side. Look for the Cimla Turizm - APL Transfer sign.</li>
                <li>One of our staff members will meet you there and escort you to your driver.</li>
            </ul>
        </li>
        <li><strong>Sabiha Gökçen Airport (SAW):</strong>
            <ul>
                <li>When you arrive at Sabiha Gökçen Airport, after completing your customs procedures and collecting your luggage, please proceed to the exit gate of the terminal.</li>
                <li>Our driver will hold a passenger name board by Column 13, located at the end of the pedestrian crossing.</li>
                <li>Upon arrival, please provide your name and reservation code to our welcome team, who will assist you and direct you to your vehicle.</li>
            </ul>
        </li>
        <li><strong>Dalaman Airport (DLM):</strong> Driver will be waiting at the arrival hall exit with an APL Transfers name board.</li>
        <li><strong>Antalya Airport (AYT):</strong> Driver will be at the arrival hall exit, holding an APL Transfers name board.</li>
        <li><strong>Bodrum Milas Airport (BJV):</strong> After baggage claim, proceed to the main arrival hall, where the driver will be waiting.</li>
        <li><strong>Izmir Adnan Menderes Airport (ADB):</strong> Look for your driver at the exit of the arrivals hall, holding a name board.</li>
    </ul>
    <p>🔹 If you cannot locate your driver, contact APL Transfers immediately before seeking alternative transport.</p>
    
    <h3>2.3 Waiting Time Policy for Non-Airport Pickups</h3>
    <p>For all other pickup locations, we allow:</p>
    <ul>
        <li>15 minutes free waiting for hotel and address pickups.</li>
        <li>60 minutes free waiting for cruise/ferry port pickups.</li>
        <li>30 minutes free waiting for high-speed train arrivals.</li>
    </ul>
    <p>If waiting time exceeds the free allowance, a €10 / £10 / $10 per 60 minutes charge applies.</p>

    <h2>3. General Terms</h2>
    <p>3.1 APL Transfers is not responsible for missed flights, trains, or cruises due to delays.</p>
    <p>3.2 Our liability is limited to a refund not exceeding the journey cost.</p>
    <p>3.3 Online bookings are not accepted within 2 hours of transfer time.</p>
    <p>3.4 We are not responsible for lost or damaged property but can arrange its return at the customer’s expense.</p>
    <p>3.5 All vehicles are non-smoking.</p>
    <h3>3.6 Excess Luggage & Vehicle Selection:</h3>
    <ul>
        <li>Customers must select the correct car type to accommodate their luggage.</li>
        <li>If the luggage does not fit inside the selected vehicle, the customer may need to book an additional vehicle at extra cost.</li>
        <li>APL Transfers is not responsible for luggage that exceeds the vehicle’s capacity.</li>
        <li>A cleaning fee of €20 / £20 / $20 / 800 TL will be charged for damage to the vehicle (e.g., vomiting, food or drink spills).</li>
        <li>Disorderly or abusive behavior will result in refusal of service.</li>
        <li>Route changes requested by passengers may incur an extra charge of €1 / £1 / $1 per km.</li>
        <li>Pets are allowed in select vehicles for a €20 / £20 / $20 charge. Pets must be transported in a secure cage or harness.</li>
    </ul>
     <h2>4. Free Child Seats for 8 & 9-Seat Private Vehicles</h2>
    <p>4.1 Child seats and booster seats will be provided FREE of charge for private transfers booked in 8 or 9-seat vehicles, such as Mercedes Vito, Mercedes V-Class, VW Transporter, or similar vehicles.</p>
    <p>4.2 Passengers must request child seats at the time of booking to ensure availability.</p>
    <p>4.3 For all other vehicles, passengers must arrange child seating at their own discretion, as child seats are not legally required in private hire vehicles in Türkiye.</p>

    <h2>5. Booking Cancellation Charges</h2>
    <h3>5.1 Cancellation Policy:</h3>
    <ul>
        <li>More than 12 hours before pickup: FREE cancellation, but a €10 / £10 / $10 / 450 TL admin fee applies.</li>
        <li>Between 6 and 12 hours before pickup: 50% cancellation charge.</li>
        <li>Less than 6 hours before pickup: 100% cancellation charge.</li>
    </ul>
    <p>5.2 Refunds may take up to 5 working days to process.</p>
    
    <h2>6. No-Show Charges</h2>
    <p>6.1 If a passenger does not show up without notifying APL Transfers, the booking will be charged in full.</p>
    <p>6.2 Waiting time rules apply as outlined in Section 2.</p>
    
    <h2>7. Non-Solicitation of Personnel</h2>
    <p>7.1 If a customer hires or directly employs an APL driver, we reserve the right to charge a €5,000 / £5,000 / $5,000 penalty to cover recruitment and training costs.</p>
    
    <h2>8. Payments</h2>
     <p>8.1 We accept cash, credit/debit cards, Apple Pay, Google Pay, PayPal, and online payments via Stripe. No extra charge for card payments.</p>
    <p>8.2 Payments are processed securely using SSL encryption. APL Transfers does not store credit card details.</p>
     <p>8.3 Credit card statements will show "Taxi Services" as the merchant name.</p>
    <h2>Contact Information</h2>
    <div>
        <p>📞 24/7 Customer Support: +90 216 550 33 13</p>
        <p>🌍 From Europe: +44 203 325 9878</p>
        <p>📱 WhatsApp: +44 73 8790 1028</p>
        <p>✉ Email: info@apltransfers.com</p>
    </div>
    `,
}
const Terms = ({ data }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dispatch = useDispatch()
    useEffect(() => {

        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        dispatch({ type: SET_ACTIVELINK_ID, payload: 6 });
        localStorage.setItem("activeLinkId", JSON.stringify(6))
    }, [dispatch])

    return (
        <Layout loggedIn={data}>
            <div className={`page ${styles.page} ${windowDimensions.width < 990 ? "ml_0" : "0"}`}>
                <div className={`page_section ${styles.page_section} `}  >
                    <div className={`page_section_container ${styles.page_section_container} `} >
                        <div className={styles.terms_content}>
                            <p className={styles.entry_text}>
                                <span>
                                    <img style={{ width: "320px" }} src="/logos/logo.webp" alt="" />
                                </span>
                            </p>
                        </div>


                        <div className={styles.terms_div}>
                            <DangerouslyInnerHtml htmContent={htmlContent["en"]} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Terms;
export async function getServerSideProps({ req, res }) {
    const { cookie } = req.headers;
    const cookies = parseCookies(cookie);
  
    // Check if the required cookie exists
    const verify = Boolean(cookies["user-id"]); 
  
    if (!verify) {
      // If the cookie doesn't exist, redirect to home page
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    // If the cookie exists, proceed with rendering the page
    return {
      props: {
        data: verify,
      },
    };
  }