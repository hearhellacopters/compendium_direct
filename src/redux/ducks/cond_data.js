export const GET_CONDDATA = "GET_CONDDATA";
const SET_CONDDATA = "SET_CONDDATA";

export const getCondData = () => ({
  type: GET_CONDDATA
});

export const setCondData = (conddata) => ({
  type: SET_CONDDATA,
  conddata: conddata
});

const initialState = {
    conddata: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONDDATA:
      const { conddata } = action;
      return { ...state, conddata: conddata };
    default:
      return state;
  }
};
