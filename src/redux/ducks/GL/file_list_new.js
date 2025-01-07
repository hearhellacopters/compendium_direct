export const GET_GLFILELISTNEW = "GET_GLFILELISTNEW";
const SET_GLFILELISTNEW = "SET_GLFILELISTNEW";

export const getGLFileListNew = () => ({
  type: GET_GLFILELISTNEW
});

export const setGLFileListNew = (file_list_new_gl) => ({
  type: SET_GLFILELISTNEW,
  file_list_new_gl: file_list_new_gl
});

const initialState = {
  file_list_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLFILELISTNEW:
      const { file_list_new_gl } = action;
      return { ...state, file_list_new_gl: file_list_new_gl };
    default:
      return state;
  }
};
