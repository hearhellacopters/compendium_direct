export const GET_ENEMYBUFFS_DIRECT = "GET_ENEMYBUFFS_DIRECT";
const SET_ENEMYBUFFS_DIRECT = "SET_ENEMYBUFFS_DIRECT";

export const getEnemyBuffsDirect = () => ({
  type: GET_ENEMYBUFFS_DIRECT
});

export const setEnemyBuffsDirect = (enemybuffs_direct) => ({
  type: SET_ENEMYBUFFS_DIRECT,
  enemybuffs_direct: enemybuffs_direct
});

const initialState = {
  enemybuffs_direct: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENEMYBUFFS_DIRECT:
      const { enemybuffs_direct } = action;
      return { ...state, enemybuffs_direct: enemybuffs_direct };
    default:
      return state;
  }
};
