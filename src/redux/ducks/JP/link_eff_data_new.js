export const GET_JPLINKEFFECTDATANEW = "GET_JPLINKEFFECTDATANEW";
const SET_JPLINKEFFECTDATANEW = "SET_JPLINKEFFECTDATANEW";

export const getJPLinkEffDataNew = () => ({
  type: GET_JPLINKEFFECTDATANEW
});

export const setJPLinkEffDataNew = (link_effect_data_new_jp) => ({
  type: SET_JPLINKEFFECTDATANEW,
  link_effect_data_new_jp: link_effect_data_new_jp
});

const initialState = {
  link_effect_data_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPLINKEFFECTDATANEW:
      const { link_effect_data_new_jp } = action;
      return { ...state, link_effect_data_new_jp: link_effect_data_new_jp };
    default:
      return state;
  }
};
