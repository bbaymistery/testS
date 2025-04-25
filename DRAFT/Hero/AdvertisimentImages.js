import React from 'react'
import styles from "./styles.module.scss"
import Image from 'next/image'
const AdvertisimentImages = ({ islinknamecomponent, width }) => {
    return (

        <div className={`${styles.advertisiment_images_section} ${!islinknamecomponent ? styles.advertisiment_images_section_islinkname : ""} page_section`}>
            <div className={`${styles.advertisiment_images_section_container} page_section_container`}>
                <div className={styles.advertisiment_images}>
                    <a rel="noreferrer" href="https://www.tripadvisor.co.uk/Attraction_Review-g186338-d11966434-Reviews-Airport_Pickups_London-London_England.html" target={"_blank"} >
                        <div className={`${styles.review_trip_advisor} ${width < 768 ? "" : "bottom_to_top_animation2"}`} style={{ animationDelay: '.5s', animationDuration: '1s' }}>
                            <Image fetchPriority="high" loading={"eager"} width={330} height={141} priority style={{ objectFit: 'contain' }} src="/images/others/advisorTrip.webp" alt="Airport Pickups London Tripadvisor" />
                        </div>
                    </a>

                    <a rel="noreferrer" href="https://www.trustpilot.com/review/airport-pickups-london.com" target={"_blank"} >
                        <div className={`${styles.review_trip_advisor} ${width < 768 ? "" : "bottom_to_top_animation2"}`} style={{ animationDelay: '0.75s', animationDuration: '1s' }}>
                            <Image loading={"eager"} width={330} height={141} priority style={{ objectFit: 'contain' }} src="/images/others/Excellent.webp" alt=" Airport Pickups London Trustpilot " />
                        </div>
                    </a>

                    <a rel="noreferrer" href="https://www.reviews.co.uk/company-reviews/store/airport-pickups-london-com" target={"_blank"} >
                        <div className={`${styles.review_trip_advisor} ${width < 768 ? "" : "bottom_to_top_animation2"}`} style={{ animationDelay: '1s', animationDuration: '1s' }}>
                            <Image loading={"eager"} width={330} height={141} priority style={{ objectFit: 'contain' }} src="/images/others/Reviews.webp" alt="Airport Pickups London Review" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AdvertisimentImages