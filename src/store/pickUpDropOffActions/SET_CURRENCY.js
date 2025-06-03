function SET_CURRENCY(params = {}) {
    let { state, action } = params;
    let { data: { text, currencyId } } = action;
    let newState = JSON.parse(JSON.stringify(state))
    newState.params.selectedCurrency.currency= text
    newState.params.selectedCurrency.currencyId= currencyId
    return newState;
}

export default SET_CURRENCY