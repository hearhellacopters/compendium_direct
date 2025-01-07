export const GET_JPHITDATANEW = "GET_JPHITDATANEW";
const SET_JPHITDATANEW = "SET_JPHITDATANEW";

export const getJPHitDataNew = () => ({
  type: GET_JPHITDATANEW
});

export const setJPHitDataNew = (hit_data_new_jp) => ({
  type: SET_JPHITDATANEW,
  hit_data_new_jp: hit_data_new_jp
});

const initialState = {
  hit_data_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPHITDATANEW:
      const { hit_data_new_jp } = action;
      return { ...state, hit_data_new_jp: hit_data_new_jp };
    default:
      return state;
  }
};
