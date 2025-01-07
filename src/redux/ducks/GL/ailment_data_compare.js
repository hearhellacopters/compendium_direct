export const GET_GLAILMENTDATACOMPARE = "GET_GLAILMENTDATACOMPARE";
const SET_GLAILMENTDATACOMPARE = "SET_GLAILMENTDATACOMPARE";

export const getGLAilmentDataCompare = () => ({
  type: GET_GLAILMENTDATACOMPARE
});

export const setGLAilmentDataCompare = (ailment_data_compare_gl) => ({
  type: SET_GLAILMENTDATACOMPARE,
  ailment_data_compare_gl: ailment_data_compare_gl
});

const initialState = {
  ailment_data_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTDATACOMPARE:
      const { ailment_data_compare_gl } = action;
      return { ...state, ailment_data_compare_gl: ailment_data_compare_gl };
    default:
      return state;
  }
};
