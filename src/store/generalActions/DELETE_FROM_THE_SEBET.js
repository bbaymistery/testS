import { saveToLocalStorage } from "../../helpers/localstorageHelper";

function DELETE_FROM_THE_SEBET(params = {}) {
    let { state, action } = params;
    let { data: { id } } = action;
    let newState = JSON.parse(JSON.stringify(state))


    //filter sewstate.sebet and delete id from the sebet
    newState.sebet = newState.sebet.filter(item => item.id !== id);

    ///update totalPriceOfSebet
    newState.totalPriceOfSebet = newState.sebet.reduce((acc, item) => acc + item.priceOfItemTotally, 0);
    saveToLocalStorage('sebet', newState.sebet);
saveToLocalStorage('totalPrice', newState.totalPriceOfSebet);
    return newState;
}

export default DELETE_FROM_THE_SEBET