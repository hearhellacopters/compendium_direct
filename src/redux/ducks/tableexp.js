export const GET_EXPTABLE = "GET_EXPTABLE";
const SET_EXPTABLE = "SET_EXPTABLE";

export const getEXPTable = () => ({
  type: GET_EXPTABLE
});

export const setEXPTable = (tableexp) => ({
  type: SET_EXPTABLE,
  tableexp: tableexp
});

const initialState = {
  tableexp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPTABLE:
      const { tableexp } = action;
      return { ...state, tableexp: tableexp };
    default:
      return state;
  }
};
