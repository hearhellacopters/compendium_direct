export const GET_GLENEMYOPTIONNEW = "GET_GLENEMYOPTIONNEW";
const SET_GLENEMYOPTIONNEW = "SET_GLENEMYOPTIONNEW";

export const getGLEnemyOptionNew = () => ({
  type: GET_GLENEMYOPTIONNEW
});

export const setGLEnemyOptionNew = (enemy_option_new_gl) => ({
  type: SET_GLENEMYOPTIONNEW,
  enemy_option_new_gl: enemy_option_new_gl
});

const initialState = {
  enemy_option_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLENEMYOPTIONNEW:
      const { enemy_option_new_gl } = action;
      return { ...state, enemy_option_new_gl: enemy_option_new_gl };
    default:
      return state;
  }
};
