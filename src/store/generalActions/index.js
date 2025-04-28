import CLEAN_SEBET from "./CLEAN_SEBET";
import DECREASE_SEBET_ITEM from "./DECREASE_SEBET_ITEM";
import DELETE_FROM_THE_SEBET from "./DELETE_FROM_THE_SEBET";
import INCREASE_SEBET_ITEM from "./INCREASE_SEBET_ITEM";
import SET_NEW_LANGUAGE from "./SET_NEW_LANGUAGE";
import UMUMI_SEBETE_EKLE from "./UMUMI_SEBETE_EKLE";
const INITIAL_STATE = {
  params: {
    language: "az"
  },
  sebet: [

  ],
  totalPriceOfSebet: 0,
};
export const generalActions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UMUMI_SEBETE_EKLE': {
      return UMUMI_SEBETE_EKLE({ state, action })
    }
    case "CLEAN_SEBET": {
      return CLEAN_SEBET({ state, action })
    }
    case "SET_NEW_LANGUAGE": {
      return SET_NEW_LANGUAGE({ state, action })
    }
    case "DELETE_FROM_THE_SEBET": {
      return DELETE_FROM_THE_SEBET({ state, action })
    }
    case "INCREASE_SEBET_ITEM": {
      return INCREASE_SEBET_ITEM({ state, action })
    }
    case "DECREASE_SEBET_ITEM": {
      return DECREASE_SEBET_ITEM({ state, action })
    } 
    default:
      return state;
  }
};
