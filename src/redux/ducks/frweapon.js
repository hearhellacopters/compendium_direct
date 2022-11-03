export const GET_FRWEAPON = "GET_FRWEAPON";
const SET_FRWEAPON = "SET_FRWEAPON";

export const getFRWeapon = () => ({
  type: GET_FRWEAPON
});

export const setFRWeapon = (frweapon) => ({
  type: SET_FRWEAPON,
  frweapon: frweapon
});

const initialState = {
  frweapon: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FRWEAPON:
      const { frweapon } = action;
      return { ...state, frweapon: frweapon };
    default:
      return state;
  }
};
