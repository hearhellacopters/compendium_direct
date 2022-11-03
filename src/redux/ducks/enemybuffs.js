export const GET_ENEMYBUFFS = "GET_ENEMYBUFFS";
const SET_ENEMYBUFFS = "SET_ENEMYBUFFS";

export const getEnemyBuffs = () => ({
  type: GET_ENEMYBUFFS
});

export const setEnemyBuffs = (enemybuffs) => ({
  type: SET_ENEMYBUFFS,
  enemybuffs: enemybuffs
});

const initialState = {
  enemybuffs: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYBUFFS:
      const { enemybuffs } = action;
      return { ...state, enemybuffs: enemybuffs };
    default:
      return state;
  }
};
