export const GET_ENEMIES_DIRECT = "GET_ENEMIES_DIRECT";
const SET_ENEMIES_DIRECT = "SET_ENEMIES_DIRECT";

export const getEnemiesDirect = () => ({
  type: GET_ENEMIES_DIRECT
});

export const setEnemiesDirect = (enemies_direct) => ({
  type: SET_ENEMIES_DIRECT,
  enemies_direct: enemies_direct
});

const initialState = {
  enemies_direct: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMIES_DIRECT:
      const { enemies_direct } = action;
      return { ...state, enemies_direct: enemies_direct };
    default:
      return state;
  }
};
