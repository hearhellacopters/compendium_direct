export const GET_PASSIVEEFFECTS = "GET_PASSIVEEFFECTS";
const SET_PASSIVEEFFECTS = "SET_PASSIVEEFFECTS";

export const getPassiveEffects = () => ({
  type: GET_PASSIVEEFFECTS
});

export const setPassiveEffects = (passive_effects) => ({
  type: SET_PASSIVEEFFECTS,
  passive_effects: passive_effects
});

const initialState = {
  passive_effects: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSIVEEFFECTS:
      const { passive_effects } = action;
      return { ...state, passive_effects: passive_effects };
    default:
      return state;
  }
};