export const GET_ENEMYRESISTFULL = "GET_ENEMYRESISTFULL";
const SET_ENEMYRESISTFULL= "SET_ENEMYRESISTFULL";

export const getEnemyResistFull = () => ({
  type: GET_ENEMYRESISTFULL
});

export const setEnemyResistFull = (enemy_resist_full) => ({
  type: SET_ENEMYRESISTFULL,
  enemy_resist_full: enemy_resist_full
});

const initialState = {
  enemy_resist_full: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYRESISTFULL:
      const { enemy_resist_full } = action;
      return { ...state, enemy_resist_full: enemy_resist_full };
    default:
      return state;
  }
};
