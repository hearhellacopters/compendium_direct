export const GET_MASTERINDEX = "GET_MASTERINDEX";
const SET_MASTERINDEX = "SET_MASTERINDEX";

const make_casts = (master_index) => {
  const CastNames = {}
  Object.values(master_index.ailments).forEach(self => {
    if (self.castID != undefined) {
      Object.assign(CastNames, { [self.castID]: self })
    }
  })
  Object.assign(master_index, { cast_names: CastNames })
  return master_index
}


export const getMasterIndex = () => ({
  type: GET_MASTERINDEX
});

export const setMasterIndex = (master_index) => ({
  type: SET_MASTERINDEX,
  master_index: make_casts(master_index)
});

const initialState = {
  master_index: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MASTERINDEX:
      const { master_index } = action;
      return { ...state, master_index: master_index };
    default:
      return state;
  }
};
