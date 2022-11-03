export const GET_CHARID = "GET_CHARID";
const SET_CHARID= "SET_CHARID";

export const getCharID = () => ({
  type: GET_CHARID
});

export const setCharID = (charid) => ({
  type: SET_CHARID,
  charid: charid
});

const initialState = {
    charid: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARID:
      const { charid } = action;
      return { ...state, charid: charid };
    default:
      return state;
  }
};
