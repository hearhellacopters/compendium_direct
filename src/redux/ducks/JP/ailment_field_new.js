export const GET_JPAILMENTFIELDNEW = "GET_JPAILMENTFIELDNEW";
const SET_JPAILMENTFIELDNEW = "SET_JPAILMENTFIELDNEW";

export const getJPAilmentFieldNew = () => ({
  type: GET_JPAILMENTFIELDNEW
});

export const setJPAilmentFieldNew = (ailment_field_new_jp) => ({
  type: SET_JPAILMENTFIELDNEW,
  ailment_field_new_jp: ailment_field_new_jp
});

const initialState = {
  ailment_field_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTFIELDNEW:
      const { ailment_field_new_jp } = action;
      return { ...state, ailment_field_new_jp: ailment_field_new_jp };
    default:
      return state;
  }
};
