export const GET_OPTIONTRANSDATA = "GET_OPTIONTRANSDATA";
const SET_OPTIONTRANSDATA= "SET_OPTIONTRANSDATA";

export const getOptionTransData = () => ({
  type: GET_OPTIONTRANSDATA
});

export const setOptionTransData = (option_trans_data) => ({
  type: SET_OPTIONTRANSDATA,
  option_trans_data: option_trans_data
});

const initialState = {
  option_trans_data: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTIONTRANSDATA:
      const { option_trans_data } = action;
      return { ...state, option_trans_data: option_trans_data };
    default:
      return state;
  }
};
