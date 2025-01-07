export const GET_GLSUMMONABILITYNEW = "GET_GLSUMMONABILITYNEW";
const SET_GLSUMMONABILITYNEW = "SET_GLSUMMONABILITYNEW";

export const getGLSummonAbilityNew = () => ({
  type: GET_GLSUMMONABILITYNEW
});

export const setGLSummonAbilityNew = (summon_ability_new_gl) => ({
  type: SET_GLSUMMONABILITYNEW,
  summon_ability_new_gl: summon_ability_new_gl
});

const initialState = {
  summon_ability_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLSUMMONABILITYNEW:
      const { summon_ability_new_gl } = action;
      return { ...state, summon_ability_new_gl: summon_ability_new_gl };
    default:
      return state;
  }
};
