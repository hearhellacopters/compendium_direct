export const GET_GLENEMYABILITYCOMPARE = "GET_GLENEMYABILITYCOMPARE";
const SET_GLENEMYABILITYCOMPARE = "SET_GLENEMYABILITYCOMPARE";

export const getGLEnemyAbilityCompare = () => ({
  type: GET_GLENEMYABILITYCOMPARE
});

export const setGLEnemyAbilityCompare = (enemy_ability_compare_gl) => ({
  type: SET_GLENEMYABILITYCOMPARE,
  enemy_ability_compare_gl: enemy_ability_compare_gl
});

const initialState = {
  enemy_ability_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLENEMYABILITYCOMPARE:
      const { enemy_ability_compare_gl } = action;
      return { ...state, enemy_ability_compare_gl: enemy_ability_compare_gl };
    default:
      return state;
  }
};
