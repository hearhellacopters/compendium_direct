export const GET_ENEMIES = "GET_ENEMIES";
const SET_ENEMIES = "SET_ENEMIES";

export const getEnemies = () => ({
  type: GET_ENEMIES
});

export const setEnemies = (enemies) => ({
  type: SET_ENEMIES,
  enemies: enemies
});

const initialState = {
  enemies: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMIES:
      const { enemies } = action;
      return { ...state, enemies: enemies };
    default:
      return state;
  }
};
