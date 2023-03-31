export const GET_CRYSTALABILITIES = "GET_CRYSTALABILITIES";
const SET_CRYSTALABILITIES= "SET_CRYSTALABILITIES";

export const getCrystalAbilities = () => ({
  type: GET_CRYSTALABILITIES
});

export const setCrystalAbilities = (crystalabilities) => ({
  type: SET_CRYSTALABILITIES,
  crystalabilities: crystalabilities
});

const initialState = {
    crystalabilities: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYSTALABILITIES:
      const { crystalabilities } = action;
      return { ...state, crystalabilities: crystalabilities };
    default:
      return state;
  }
};
