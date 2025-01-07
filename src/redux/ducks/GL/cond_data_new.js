export const GET_GLCONDDATANEW = "GET_GLCONDDATANEW";
const SET_GLCONDDATANEW = "SET_GLCONDDATANEW";

export const getGLCondDataNew = () => ({
  type: GET_GLCONDDATANEW
});

export const setGLCondDataNew = (cond_data_new_gl) => ({
  type: SET_GLCONDDATANEW,
  cond_data_new_gl: cond_data_new_gl
});

const initialState = {
  cond_data_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLCONDDATANEW:
      const { cond_data_new_gl } = action;
      return { ...state, cond_data_new_gl: cond_data_new_gl };
    default:
      return state;
  }
};
