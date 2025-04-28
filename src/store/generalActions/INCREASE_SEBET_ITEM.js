import { saveToLocalStorage } from "../../helpers/localstorageHelper";

const INCREASE_SEBET_ITEM = (params = {}) => {
    let { state, action } = params;
    const { data: { id } } = action;
    let newState = JSON.parse(JSON.stringify(state));

    const newSebet = newState.sebet.map(item =>
        item.id === id
            ? {
                ...item,
                quantityItem: item.quantityItem + 1,
                priceOfItemTotally: +(item.price) * (item.quantityItem + 1),
            }
            : item
    );

    const totalPrice = newSebet.reduce((acc, item) => acc + item.priceOfItemTotally, 0);
    saveToLocalStorage('sebet', newSebet);
    saveToLocalStorage('totalPrice', totalPrice);

    return {
        ...state,
        sebet: newSebet,
        totalPriceOfSebet: totalPrice,
    };
};
export default INCREASE_SEBET_ITEM;