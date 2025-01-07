export const GET_GLENEMYABILITYNEW = "GET_GLENEMYABILITYNEW";
const SET_GLENEMYABILITYNEW = "SET_GLENEMYABILITYNEW";

export const getGLEnemyAbilityNew = () => ({
  type: GET_GLENEMYABILITYNEW
});

export const setGLEnemyAbilityNew = (enemy_ability_new_gl) => ({
  type: SET_GLENEMYABILITYNEW,
  enemy_ability_new_gl: enemy_ability_new_gl
});

const initialState = {
  enemy_ability_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLENEMYABILITYNEW:
      const { enemy_ability_new_gl } = action;
      return { ...state, enemy_ability_new_gl: enemy_ability_new_gl };
    default:
      return state;
  }
};
