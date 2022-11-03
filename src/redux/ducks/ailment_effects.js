export const GET_AILMENTEFFECTS = "GET_AILMENTEFFECTS";
const SET_AILMENTEFFECTS = "SET_AILMENTEFFECTS";

export const getAilmentEffects = () => ({
  type: GET_AILMENTEFFECTS
});

export const setAilmentEffects = (ailment_effects) => ({
  type: SET_AILMENTEFFECTS,
  ailment_effects: ailment_effects
});

const initialState = {
    ailment_effects: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AILMENTEFFECTS:
      const { ailment_effects } = action;
      return { ...state, ailment_effects: ailment_effects };
    default:
      return state;
  }
};
