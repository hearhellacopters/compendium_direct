export const GET_ENEMYTYPE = "GET_ENEMYTYPE";
const SET_ENEMYTYPE = "SET_ENEMYTYPE";

export const getEnemyType = () => ({
  type: GET_ENEMYTYPE
});

export const setEnemyType = (enemy_type) => ({
  type: SET_ENEMYTYPE,
  enemy_type: enemy_type
});

const initialState = {
    enemy_type: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYTYPE:
      const { enemy_type } = action;
      return { ...state, enemy_type: enemy_type };
    default:
      return state;
  }
};
