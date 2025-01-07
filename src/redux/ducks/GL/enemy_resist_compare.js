export const GET_GLENEMYRESISTCOMPARE = "GET_GLENEMYRESISTCOMPARE";
const SET_GLENEMYRESISTCOMPARE = "SET_GLENEMYRESISTCOMPARE";

export const getGLEnemyResistCompare = () => ({
  type: GET_GLENEMYRESISTCOMPARE
});

export const setGLEnemyResistCompare = (enemy_resist_compare_gl) => ({
  type: SET_GLENEMYRESISTCOMPARE,
  enemy_resist_compare_gl: enemy_resist_compare_gl
});

const initialState = {
  enemy_resist_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLENEMYRESISTCOMPARE:
      const { enemy_resist_compare_gl } = action;
      return { ...state, enemy_resist_compare_gl: enemy_resist_compare_gl };
    default:
      return state;
  }
};
