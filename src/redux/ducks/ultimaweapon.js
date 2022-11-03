export const GET_ULTIMAWEAPON = "GET_ULTIMAWEAPON";
const SET_ULTIMAWEAPON = "SET_ULTIMAWEAPON";

export const getUltimaWeapon = () => ({
  type: GET_ULTIMAWEAPON
});

export const setUltimaWeapon = (ultimaweapon) => ({
  type: SET_ULTIMAWEAPON,
  ultimaweapon: ultimaweapon
});

const initialState = {
  ultimaweapon: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ULTIMAWEAPON:
      const { ultimaweapon } = action;
      return { ...state, ultimaweapon: ultimaweapon };
    default:
      return state;
  }
};
