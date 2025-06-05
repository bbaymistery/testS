import currencies from "../constants/currencies";

/**
 * Get the symbol and correct price for an item based on active currency.
 *
 * @param {Object} params
 * @param {number|string} params.currencyId - Selected currency ID.
 * @param {Object} params.item - Item that contains price, exchangedPrice, currencyId.
 * @returns {{ symbol: string, displayedPrice: number }}
 */
export const getDisplayedPrice = ({ currencyId, item = {} }) => {
    const isEuro = +currencyId === 1;
    const symbol = isEuro ? "€" : currencies.find(c => c.currencyId === +currencyId)?.symb || "£";

    const displayedPrice = isEuro ? item.price : item.exchangedPrice;

    return { symbol, displayedPrice };
};
