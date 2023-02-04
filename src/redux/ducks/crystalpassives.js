export const GET_CRYSTALPASSIVES = "GET_CRYSTALPASSIVES";
const SET_CRYSTALPASSIVES= "SET_CRYSTALPASSIVES";

export const getCrystalPassives = () => ({
  type: GET_CRYSTALPASSIVES
});

export const setCrystalPassives = (crystalpassives) => ({
  type: SET_CRYSTALPASSIVES,
  crystalpassives: crystalpassives
});

const initialState = {
    crystalpassives: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYSTALPASSIVES:
      const { crystalpassives } = action;
      return { ...state, crystalpassives: crystalpassives };
    default:
      return state;
  }
};
