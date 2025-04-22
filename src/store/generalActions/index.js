import SET_NEW_LANGUAGE from "./SET_NEW_LANGUAGE";
import SWITCH_JOURNEY from "./SWITCH_JOURNEY";
const INITIAL_STATE = {
  params: {
    language: "az"
  }
};
export const generalActions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SWITCH_JOURNEY': {
      return SWITCH_JOURNEY({ state, action })
    }
    case "SET_NEW_LANGUAGE": {
      return SET_NEW_LANGUAGE({ state, action })
    }
    default:
      return state;
  }
};
