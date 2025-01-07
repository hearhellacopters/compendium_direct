export const GET_GLAILMENTDATANEW = "GET_GLAILMENTDATANEW";
const SET_GLAILMENTDATANEW = "SET_GLAILMENTDATANEW";

export const getGLAilmentDataNew = () => ({
  type: GET_GLAILMENTDATANEW
});

export const setGLAilmentDataNew = (ailment_data_new_gl) => ({
  type: SET_GLAILMENTDATANEW,
  ailment_data_new_gl: ailment_data_new_gl
});

const initialState = {
  ailment_data_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTDATANEW:
      const { ailment_data_new_gl } = action;
      return { ...state, ailment_data_new_gl: ailment_data_new_gl };
    default:
      return state;
  }
};
