export const GET_GLENEMYRESISTNEW = "GET_GLENEMYRESISTNEW";
const SET_GLENEMYRESISTNEW = "SET_GLENEMYRESISTNEW";

export const getGLEnemyResistNew = () => ({
  type: GET_GLENEMYRESISTNEW
});

export const setGLEnemyResistNew = (enemy_resist_new_gl) => ({
  type: SET_GLENEMYRESISTNEW,
  enemy_resist_new_gl: enemy_resist_new_gl
});

const initialState = {
  enemy_resist_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLENEMYRESISTNEW:
      const { enemy_resist_new_gl } = action;
      return { ...state, enemy_resist_new_gl: enemy_resist_new_gl };
    default:
      return state;
  }
};
