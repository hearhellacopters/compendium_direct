export const GET_WEAPONSKINS = "GET_WEAPONSKINS";
const SET_WEAPONSKINS = "SET_WEAPONSKINS";

export const getWeaponSkins = () => ({
  type: GET_WEAPONSKINS
});

export const setWeaponSkins = (weapon_skins) => ({
  type: SET_WEAPONSKINS,
  weapon_skins: weapon_skins
});

const initialState = {
  weapon_skins: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEAPONSKINS:
      const { weapon_skins } = action;
      return { ...state, weapon_skins: weapon_skins };
    default:
      return state;
  }
};
