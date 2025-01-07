export const GET_JPFILELISTNEW = "GET_JPFILELISTNEW";
const SET_JPFILELISTNEW = "SET_JPFILELISTNEW";

export const getJPFileListNew = () => ({
  type: GET_JPFILELISTNEW
});

export const setJPFileListNew = (file_list_new_jp) => ({
  type: SET_JPFILELISTNEW,
  file_list_new_jp: file_list_new_jp
});

const initialState = {
  file_list_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPFILELISTNEW:
      const { file_list_new_jp } = action;
      return { ...state, file_list_new_jp: file_list_new_jp };
    default:
      return state;
  }
};
