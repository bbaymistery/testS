import moment from "moment";

/**
 * Adds 3 hours to the original transfer date and returns updated return transferDateTimeString.
 * 
 * @param {Object} params
 * @param {Object} params.newState
 * @returns {string} returnDateTimeString
 */
const putReturnDateTimeThreeHoursForward = (params = {}) => {
    const { newState } = params;

    const trDate = newState.reservations[0].transferDetails.transferDateTimeString;

    // Parse with moment (no timezone)
    const returnMoment = moment(trDate, "YYYY-MM-DD HH:mm");

    // Add 3 hours (auto handles day overflow)
    returnMoment.add(3, "hours");

    // Return formatted string
    return returnMoment.format("YYYY-MM-DD HH:mm");
};

function SWITCH_JOURNEY(params = {}) {
    let { state, action } = params;
    let { data: { journeyType } } = action;
    let newState = JSON.parse(JSON.stringify(state))
    //setting new journeytype
    newState.params.journeyType = journeyType
    //get pick and drops point from transferJourney
    let pickUpsTr = newState.reservations[0].selectedPickupPoints;
    let dropOffsTr = newState.reservations[0].selectedDropoffPoints;

    if (parseInt(journeyType) === 1) {
        //clone the first reservation obj
        let newReserVationObject = [{ ...newState.reservations[0] }]
        //Changing pick and drop points  and setting return transferDateTimeString
        newReserVationObject = [{
            ...newReserVationObject[0],
            selectedPickupPoints: [...dropOffsTr],
            selectedDropoffPoints: [...pickUpsTr],
            transferDetails: {
                ...newReserVationObject[0].transferDetails,
                transferDateTimeString: putReturnDateTimeThreeHoursForward({ newState })
            }
        }]
        //putting newReserVationObject to the near of  previous one
        newState.reservations = [{ ...newState.reservations[0] }, { ...newReserVationObject[0] },]
    } else {
        newState.reservations = [{ ...newState.reservations[0] }]
    }

    return newState;
}

export default SWITCH_JOURNEY