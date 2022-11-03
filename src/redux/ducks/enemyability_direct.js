export const GET_ENEMYABILITY_DIRECT = "GET_ENEMYABILITY_DIRECT";
const SET_ENEMYABILITY_DIRECT = "SET_ENEMYABILITY_DIRECT";

export const getEnemyAbilityDirect = () => ({
  type: GET_ENEMYABILITY_DIRECT
});

export const setEnemyAbilityDirect= (enemyability_direct) => ({
  type: SET_ENEMYABILITY_DIRECT,
  enemyability_direct: enemyability_direct
});

const initialState = {
    enemyability_direct: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYABILITY_DIRECT:
      const { enemyability_direct } = action;
      return { ...state, enemyability_direct: enemyability_direct };
    default:
      return state;
  }
};
