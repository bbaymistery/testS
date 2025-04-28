const DECREASE_SEBET_ITEM = (params = {}) => {
    let { state, action } = params;
    const { data:{id} } = action;
    let newState = JSON.parse(JSON.stringify(state));

    const existingItem = newState.sebet.find(item => item.id === id);

    if (!existingItem) {
        console.error("Ürün sepette bulunamadı:", id);
        return newState;
    }

    let newSebet;

    if (existingItem.quantityItem <= 1) {
        // Eğer quantity 1 veya daha azsa, ürünü sebetten tamamen kaldır
        newSebet = newState.sebet.filter(item => item.id !== id);
    } else {
        // quantityItem 1'den büyükse azalt
        newSebet = newState.sebet.map(item =>
            item.id === id
                ? {
                    ...item,
                    quantityItem: item.quantityItem - 1,
                    priceOfItemTotally: +(item.price) * (item.quantityItem - 1),
                }
                : item
        );
    }

    const totalPrice = newSebet.reduce((acc, item) => acc + item.priceOfItemTotally, 0);

    return {
        ...state,
        sebet: newSebet,
        totalPriceOfSebet: totalPrice,
    };
};
export default DECREASE_SEBET_ITEM;