export const GET_ENEMYNAMES = "GET_ENEMYNAMES";
const SET_ENEMYNAMES = "SET_ENEMYNAMES";

export const getEnemyNames = () => ({
  type: GET_ENEMYNAMES
});

export const setEnemyNames = (enemy_names) => ({
  type: SET_ENEMYNAMES,
  enemy_names: enemy_names
});

const initialState = {
  enemy_names: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYNAMES:
      const { enemy_names } = action;
      return { ...state, enemy_names: enemy_names };
    default:
      return state;
  }
};
