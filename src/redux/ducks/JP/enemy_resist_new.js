export const GET_JPENEMYRESISTNEW = "GET_JPENEMYRESISTNEW";
const SET_JPENEMYRESISTNEW = "SET_JPENEMYRESISTNEW";

export const getJPEnemyResistNew = () => ({
  type: GET_JPENEMYRESISTNEW
});

export const setJPEnemyResistNew = (enemy_resist_new_jp) => ({
  type: SET_JPENEMYRESISTNEW,
  enemy_resist_new_jp: enemy_resist_new_jp
});

const initialState = {
  enemy_resist_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPENEMYRESISTNEW:
      const { enemy_resist_new_jp } = action;
      return { ...state, enemy_resist_new_jp: enemy_resist_new_jp };
    default:
      return state;
  }
};
