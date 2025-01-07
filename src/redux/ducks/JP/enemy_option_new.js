export const GET_JPENEMYOPTIONNEW = "GET_JPENEMYOPTIONNEW";
const SET_JPENEMYOPTIONNEW = "SET_JPENEMYOPTIONNEW";

export const getJPEnemyOptionNew = () => ({
  type: GET_JPENEMYOPTIONNEW
});

export const setJPEnemyOptionNew = (enemy_option_new_jp) => ({
  type: SET_JPENEMYOPTIONNEW,
  enemy_option_new_jp: enemy_option_new_jp
});

const initialState = {
  enemy_option_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPENEMYOPTIONNEW:
      const { enemy_option_new_jp } = action;
      return { ...state, enemy_option_new_jp: enemy_option_new_jp };
    default:
      return state;
  }
};
