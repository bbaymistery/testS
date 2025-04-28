import {
    menuSubcategories, makiSubcategories, udonSubcategories, nigiriSubcategories, noodlesSubcategories, appetizerSubcategories, soupsSubcategories, drinksSubcategories,
    saladsSubcategories
} from '../../components/widgets/MenuBlog/MenuItemCard/menuCartItemConstants';

// Tüm ürünleri tek bir array'de birleştiren fonksiyon
const getAllProducts = () => {
    return [
        ...menuSubcategories,
        ...makiSubcategories,
        ...udonSubcategories,
        ...nigiriSubcategories,
        ...noodlesSubcategories,
        ...appetizerSubcategories,
        ...soupsSubcategories,
        ...drinksSubcategories,
        ...saladsSubcategories
    ];
};

const UMUMI_SEBETE_EKLE = (params = {}) => {
    let { state, action } = params;
    let { data: { product } } = action; //< total,  quantityItem seklinde biz elave edirik menuItemCaird ICinde
    let newState = JSON.parse(JSON.stringify(state))
    const allProducts = getAllProducts();

    // Eklenmek istenen ürünü bul
    const productToAdd = allProducts.find(pr => product.id === pr.id);
    console.log({ product });

    if (!productToAdd) {
        console.error("Ürün bulunamadı:", productToAdd.id);
        return newState;
    }

    // Sepette aynı üründen var mı kontrol et
    const existingItemIndex = newState.sebet.findIndex(item => item.id === productToAdd.id);
    // 
    let newSebet;
    if (existingItemIndex >= 0) {
        // Ürün sepette varsa miktarını artır
        newSebet = newState.sebet.map((item, index) =>
            index === existingItemIndex ?
                {
                    ...item,
                    quantityItem: item.quantityItem + 1,
                    priceOfItemTotally: +(item.price) * (item.quantityItem + 1)
                }
                : item
        );
    } else {
        // Ürün sepette yoksa yeni ekle
        newSebet = [
            ...newState.sebet,
            {
                ...productToAdd,
                price: +(productToAdd.price),
                quantityItem: 1,
                priceOfItemTotally: +(productToAdd.price) * 1,
                isExist: true,
            }
        ];
    }


    //calculating all total prices of items toether 
    const totalPrice = newSebet.reduce((acc, item) => acc + item.priceOfItemTotally, 0);
    return {
        ...state,
        sebet: newSebet,
        totalPriceOfSebet: totalPrice,
    };
};

export default UMUMI_SEBETE_EKLE;