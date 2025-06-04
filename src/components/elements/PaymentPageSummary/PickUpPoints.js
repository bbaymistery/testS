import pointsStyle from "./pointsStyle.module.scss";
import { useSelector } from 'react-redux'

const PickUpPoints = ({ selectedPickupPoints, showIcon, }) => {
  const state = useSelector(state => state.pickUpDropOffActions)
  let {  appData } = state
  console.log({ appData });

  return (
    <div className={`${pointsStyle.details} ${showIcon ? pointsStyle.detailsShowIcon : ""}`}>
      {selectedPickupPoints?.map((point, i) => {
        return (
          <div className={pointsStyle.details_bottom_container} key={i}>
            <p className={pointsStyle.point_adress}>{i + 1}.{point?.address?.includes(point?.postcode) ? `${point?.address}` : `${point?.address} ${point?.postcode ? point?.postcode : ""}`}</p>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (

              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Flight No.</span>
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}

            {/* check language_words */}
            {point?.flightDetails?.waitingPickupTime >= 0 && (
              <div className={`${pointsStyle.details_bottom_description} ${pointsStyle.details_bottom_description_2}`} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{"Requested Pickup Time"}:</span>
                  <span className={pointsStyle.flight_has_landed}>
                    {appData.words["strMinutesAfterFlightHasLanded"] || "{{}} minutes after Flight has landed".replace("{{}}", point?.flightDetails?.waitingPickupTime)}
                  </span>
                </div>
              </div>
            )}
            {/* // ! for postcodes */}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{"Postcode Address"}</span>{" "}
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}
            {point?.cruiseNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{"Cruise Name"}</span>
                  <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}
            {/* check language_words */}
            {/* //!for train */}
            {point?.trainNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Train Number:</span> <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}
            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>{"Room Number"}</span> <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}

            {/* //! cities*/}
            {/* is it gonna be description or cities? */}
            {/* check language_words */}
            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cities:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* UNIVERSITIES */}
            {/* check language_words */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Universities And Colleges:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* OTHERRRRRRR */}
            {/* check language_words */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description} >
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Description:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PickUpPoints;
