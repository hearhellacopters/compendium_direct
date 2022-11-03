export const GET_ABILITIES = "GET_ABILITIES";
const SET_ABILITIES = "SET_ABILITIES";

export const getAbilities = () => ({
  type: GET_ABILITIES
});

export const setAbilities = (abilities) => ({
  type: SET_ABILITIES,
  abilities: abilities
});

const initialState = {
  abilities: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ABILITIES:
      const { abilities } = action;
      return { ...state, abilities: abilities };
    default:
      return state;
  }
};
