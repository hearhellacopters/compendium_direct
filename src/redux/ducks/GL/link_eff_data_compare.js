export const GET_GLLINKEFFECTDATACOMPARE = "GET_GLLINKEFFECTDATACOMPARE";
const SET_GLLINKEFFECTDATACOMPARE = "SET_GLLINKEFFECTDATACOMPARE";

export const getGLLinkEffDataCompare = () => ({
  type: GET_GLLINKEFFECTDATACOMPARE
});

export const setGLLinkEffDataCompare = (link_effect_data_compare_gl) => ({
  type: SET_GLLINKEFFECTDATACOMPARE,
  link_effect_data_compare_gl: link_effect_data_compare_gl
});

const initialState = {
  link_effect_data_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLLINKEFFECTDATACOMPARE:
      const { link_effect_data_compare_gl } = action;
      return { ...state, link_effect_data_compare_gl: link_effect_data_compare_gl };
    default:
      return state;
  }
};
