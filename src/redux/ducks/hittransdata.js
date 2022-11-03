export const GET_HITTRANSDATA = "GET_HITTRANSDATA";
const SET_HITTRANSDATA= "SET_HITTRANSDATA";

export const getHitTransData = () => ({
  type: GET_HITTRANSDATA
});

export const setHitTransData = (hit_trans_data) => ({
  type: SET_HITTRANSDATA,
  hit_trans_data: hit_trans_data
});

const initialState = {
  hit_trans_data: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HITTRANSDATA:
      const { hit_trans_data } = action;
      return { ...state, hit_trans_data: hit_trans_data };
    default:
      return state;
  }
};
