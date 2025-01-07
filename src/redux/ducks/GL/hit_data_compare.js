export const GET_GLHITDATACOMPARE = "GET_GLHITDATACOMPARE";
const SET_GLHITDATACOMPARE = "SET_GLHITDATACOMPARE";

export const getGLHitDataCompare = () => ({
  type: GET_GLHITDATACOMPARE
});

export const setGLHitDataCompare = (hit_data_compare_gl) => ({
  type: SET_GLHITDATACOMPARE,
  hit_data_compare_gl: hit_data_compare_gl
});

const initialState = {
  hit_data_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLHITDATACOMPARE:
      const { hit_data_compare_gl } = action;
      return { ...state, hit_data_compare_gl: hit_data_compare_gl };
    default:
      return state;
  }
};
