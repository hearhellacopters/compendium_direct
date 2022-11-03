export const GET_ENEMYABILITY = "GET_ENEMYABILITY";
const SET_ENEMYABILITY = "SET_ENEMYABILITY";

export const getEnemyAbility = () => ({
  type: GET_ENEMYABILITY
});

export const setEnemyAbility= (enemyability) => ({
  type: SET_ENEMYABILITY,
  enemyability: enemyability
});

const initialState = {
    enemyability: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYABILITY:
      const { enemyability } = action;
      return { ...state, enemyability: enemyability };
    default:
      return state;
  }
};
