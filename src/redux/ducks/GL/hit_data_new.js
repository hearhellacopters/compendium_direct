export const GET_GLHITDATANEW = "GET_GLHITDATANEW";
const SET_GLHITDATANEW = "SET_GLHITDATANEW";

export const getGLHitDataNew = () => ({
  type: GET_GLHITDATANEW
});

export const setGLHitDataNew = (hit_data_new_gl) => ({
  type: SET_GLHITDATANEW,
  hit_data_new_gl: hit_data_new_gl
});

const initialState = {
  hit_data_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLHITDATANEW:
      const { hit_data_new_gl } = action;
      return { ...state, hit_data_new_gl: hit_data_new_gl };
    default:
      return state;
  }
};
