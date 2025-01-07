export const GET_JPLINKEFFECTDATACOMPARE = "GET_JPLINKEFFECTDATACOMPARE";
const SET_JPLINKEFFECTDATACOMPARE = "SET_JPLINKEFFECTDATACOMPARE";

export const getJPLinkEffDataCompare = () => ({
  type: GET_JPLINKEFFECTDATACOMPARE
});

export const setJPLinkEffDataCompare = (link_effect_data_compare_jp) => ({
  type: SET_JPLINKEFFECTDATACOMPARE,
  link_effect_data_compare_jp: link_effect_data_compare_jp
});

const initialState = {
  link_effect_data_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPLINKEFFECTDATACOMPARE:
      const { link_effect_data_compare_jp } = action;
      return { ...state, link_effect_data_compare_jp: link_effect_data_compare_jp };
    default:
      return state;
  }
};
