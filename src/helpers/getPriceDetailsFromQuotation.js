export function getPriceDetailsFromQuotation(params={ 'quotation':Object() },options={}) {
  try {
    let { quotation } = params;
    let price = null; 
    let normalPrice = null; 
    //
    if(  quotation.normalPrice === quotation.price ){
      price = quotation.price;
      normalPrice = quotation.normalPrice;
    } else {
      if( quotation.currencyId !== quotation.exchangedCurrencyId ){
        price = quotation.exchangedPrice;
        normalPrice = quotation.normalExchangedPrice;
      } else {
        price = quotation.price;
        normalPrice = quotation.normalPrice;
      }
    }
    //
    return { 'status':200,'data':{ 'price':parseFloat(price), 'normalPrice':parseFloat(normalPrice) } };
  } catch (error) {
    return { 'status':500,'data':error };
  }
  
}

const main = { getPriceDetailsFromQuotation }

export default main;