export const GET_JPAILMENTDATANEW = "GET_JPAILMENTDATANEW";
const SET_JPAILMENTDATANEW = "SET_JPAILMENTDATANEW";

export const getJPAilmentDataNew = () => ({
  type: GET_JPAILMENTDATANEW
});

export const setJPAilmentDataNew = (ailment_data_new_jp) => ({
  type: SET_JPAILMENTDATANEW,
  ailment_data_new_jp: ailment_data_new_jp
});

const initialState = {
  ailment_data_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTDATANEW:
      const { ailment_data_new_jp } = action;
      return { ...state, ailment_data_new_jp: ailment_data_new_jp };
    default:
      return state;
  }
};
