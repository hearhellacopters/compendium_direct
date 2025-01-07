export const GET_GLFILELISTCOMPARE = "GET_GLFILELISTCOMPARE";
const SET_GLFILELISTCOMPARE = "SET_GLFILELISTCOMPARE";

export const getGLFileListCompare = () => ({
  type: GET_GLFILELISTCOMPARE
});

export const setGLFileListCompare = (file_list_compare_gl) => ({
  type: SET_GLFILELISTCOMPARE,
  file_list_compare_gl: file_list_compare_gl
});

const initialState = {
  file_list_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLFILELISTCOMPARE:
      const { file_list_compare_gl } = action;
      return { ...state, file_list_compare_gl: file_list_compare_gl };
    default:
      return state;
  }
};
