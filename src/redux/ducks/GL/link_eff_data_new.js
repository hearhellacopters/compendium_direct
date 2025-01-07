export const GET_GLLINKEFFECTDATANEW = "GET_GLLINKEFFECTDATANEW";
const SET_GLLINKEFFECTDATANEW = "SET_GLLINKEFFECTDATANEW";

export const getGLLinkEffDataNew = () => ({
  type: GET_GLLINKEFFECTDATANEW
});

export const setGLLinkEffDataNew = (link_effect_data_new_gl) => ({
  type: SET_GLLINKEFFECTDATANEW,
  link_effect_data_new_gl: link_effect_data_new_gl
});

const initialState = {
  link_effect_data_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLLINKEFFECTDATANEW:
      const { link_effect_data_new_gl } = action;
      return { ...state, link_effect_data_new_gl: link_effect_data_new_gl };
    default:
      return state;
  }
};
