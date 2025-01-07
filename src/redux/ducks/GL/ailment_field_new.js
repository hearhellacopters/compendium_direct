export const GET_GLAILMENTFIELDNEW = "GET_GLAILMENTFIELDNEW";
const SET_GLAILMENTFIELDNEW = "SET_GLAILMENTFIELDNEW";

export const getGLAilmentFieldNew = () => ({
  type: GET_GLAILMENTFIELDNEW
});

export const setGLAilmentFieldNew = (ailment_field_new_gl) => ({
  type: SET_GLAILMENTFIELDNEW,
  ailment_field_new_gl: ailment_field_new_gl
});

const initialState = {
  ailment_field_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTFIELDNEW:
      const { ailment_field_new_gl } = action;
      return { ...state, ailment_field_new_gl: ailment_field_new_gl };
    default:
      return state;
  }
};
