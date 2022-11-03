export const GET_WEAPONCAT = "GET_WEAPONCAT";
const SET_WEAPONCAT = "SET_WEAPONCAT";

export const getWeaponCat = () => ({
  type: GET_WEAPONCAT
});

export const setWeaponCat = (weaponcat) => ({
  type: SET_WEAPONCAT,
  weaponcat: weaponcat
});

const initialState = {
    weaponcat: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEAPONCAT:
      const { weaponcat } = action;
      return { ...state, weaponcat: weaponcat };
    default:
      return state;
  }
};
