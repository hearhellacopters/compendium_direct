export const GET_BUFFS = "GET_BUFFS";
const SET_BUFFS = "SET_BUFFS";

export const getBuffs = () => ({
  type: GET_BUFFS
});

export const setBuffs = (buffs) => ({
  type: SET_BUFFS,
  buffs: buffs
});

const initialState = {
  buffs: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUFFS:
      const { buffs } = action;
      return { ...state, buffs: buffs };
    default:
      return state;
  }
};
