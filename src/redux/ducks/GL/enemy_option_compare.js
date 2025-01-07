export const GET_GLENEMYOPTIONCOMPARE = "GET_GLENEMYOPTIONCOMPARE";
const SET_GLENEMYOPTIONCOMPARE = "SET_GLENEMYOPTIONCOMPARE";

export const getGLEnemyOptionCompare = () => ({
  type: GET_GLENEMYOPTIONCOMPARE
});

export const setGLEnemyOptionCompare = (enemy_option_compare_gl) => ({
  type: SET_GLENEMYOPTIONCOMPARE,
  enemy_option_compare_gl: enemy_option_compare_gl
});

const initialState = {
  enemy_option_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLENEMYOPTIONCOMPARE:
      const { enemy_option_compare_gl } = action;
      return { ...state, enemy_option_compare_gl: enemy_option_compare_gl };
    default:
      return state;
  }
};
