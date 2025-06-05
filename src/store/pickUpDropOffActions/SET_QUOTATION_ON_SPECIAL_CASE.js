function SET_QUOTATION_ON_SPECIAL_CASE(params = {}) {
    let { state, action } = params
    let { data: { quotation, journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))

    // set Quotation
    newState.reservations[journeyType].quotation = quotation


    let paymentDetails = newState.reservations[journeyType].paymentDetails

    newState.reservations[journeyType].paymentDetails = { ...paymentDetails, price: parseInt(quotation.price) }

    return newState;
}
export default SET_QUOTATION_ON_SPECIAL_CASE
