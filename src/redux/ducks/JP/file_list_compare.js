export const GET_JPFILELISTCOMPARE = "GET_JPFILELISTCOMPARE";
const SET_JPFILELISTCOMPARE = "SET_JPFILELISTCOMPARE";

export const getJPFileListCompare = () => ({
  type: GET_JPFILELISTCOMPARE
});

export const setJPFileListCompare = (file_list_compare_jp) => ({
  type: SET_JPFILELISTCOMPARE,
  file_list_compare_jp: file_list_compare_jp
});

const initialState = {
  file_list_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPFILELISTCOMPARE:
      const { file_list_compare_jp } = action;
      return { ...state, file_list_compare_jp: file_list_compare_jp };
    default:
      return state;
  }
};
