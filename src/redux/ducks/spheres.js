export const GET_SPHERES = "GET_SPHERES";
const SET_SPHERES = "SET_SPHERES";

export const getSpheres = () => ({
  type: GET_SPHERES
});

export const setSpheres = (spheres) => ({
  type: SET_SPHERES,
  spheres: spheres
});

const initialState = {
  spheres: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPHERES:
      const { spheres } = action;
      return { ...state, spheres: spheres };
    default:
      return state;
  }
};
