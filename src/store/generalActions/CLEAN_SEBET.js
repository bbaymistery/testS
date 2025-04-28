function CLEAN_SEBET(params = {}) {
    let { state } = params;
    let newState = JSON.parse(JSON.stringify(state))


    //filter sewstate.sebet and delete id from the sebet
    newState.sebet = [];

    ///update totalPriceOfSebet
    newState.totalPriceOfSebet = 0;
    return newState;
}

export default CLEAN_SEBET