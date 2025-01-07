export const GET_JPCONDDATANEW = "GET_JPCONDDATANEW";
const SET_JPCONDDATANEW = "SET_JPCONDDATANEW";

export const getJPCondDataNew = () => ({
  type: GET_JPCONDDATANEW
});

export const setJPCondDataNew = (cond_data_new_jp) => ({
  type: SET_JPCONDDATANEW,
  cond_data_new_jp: cond_data_new_jp
});

const initialState = {
  cond_data_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCONDDATANEW:
      const { cond_data_new_jp } = action;
      return { ...state, cond_data_new_jp: cond_data_new_jp };
    default:
      return state;
  }
};
