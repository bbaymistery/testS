import Link from "next/link";
import styles from "./styles.module.scss";
const Address = ({ forMobile }) => {
    return (
        <>
            {forMobile ? (
                <div className={`${styles.mobile_left}`}>
                    <ul>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <p >
                                <h5 >Address</h5>
                                <div>
                                    <p ><span>Istanbul</span>: Evinpark Residence, A Blok D 162, Fikirtepe, Cengiz Sk No:10, 34720 Kadıköy/İstanbul, Türkiye</p>
                                    <p>
                                        <span>Fethiye</span>: Taşyaka Mah. Ölüdeniz Caddesi No:21/A D:1, Mugla, Turkiye
                                    </p>
                                    <p><span>London</span>: APL Office, Novotel Cherry Lane, UB7 9HJ, UK</p>

                                </div>
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <h5 >From Abroad</h5>
                            <p >+44 (0) 20 8688 7744</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-print"></i>
                            <h5 >Hotline 24/7</h5>
                            <p >+ 90 212 708 5540</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <h5 >Email</h5>
                            <p >info@apltransfers.com</p>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className={`${styles.content_div_left}`}>
                    <ul>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <h5 >Address</h5>
                            <p >
                                <p ><span>Istanbul</span>: Evinpark Residence, A Blok D 162, Fikirtepe, Cengiz Sk No:10, 34720 Kadıköy/İstanbul, Türkiye</p>
                                <p>
                                    <span>Fethiye</span>: Taşyaka Mah. Ölüdeniz Caddesi No:21/A D:1, Mugla, Turkiye
                                </p>
                                <p><span>London</span>: APL Office, Novotel Cherry Lane, UB7 9HJ, UK</p>
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-globe"></i>
                            <h5 >From Abroad</h5>
                            <p >+44 (0) 20 8688 7744</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <h5 >Hotline 24/7</h5>
                            <p >+ 90 212 708 5540</p>
                        </li>

                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <h5 >Email</h5>
                            <p >info@apltransfers.com</p>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Address;