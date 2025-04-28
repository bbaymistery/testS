
function SET_LOCALSTORAGE_ITEMS(params = {}) {
    let { state, action } = params;
    const { data: { sebet, totalPrice } } = action;

    let newState = JSON.parse(JSON.stringify(state))


    //filter sewstate.sebet and delete id from the sebet
    newState.sebet = sebet;

    ///update totalPriceOfSebet
    newState.totalPriceOfSebet = totalPrice;

    return newState;
}

export default SET_LOCALSTORAGE_ITEMS