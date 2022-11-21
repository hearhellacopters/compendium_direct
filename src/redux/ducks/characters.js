export const GET_CHARACTERS = "GET_CHARACTERS";
const SET_CHARACTERS = "SET_CHARACTERS";

const merg_data =(characters, access)=>{
    Object.values(characters).forEach(self=>{
      if(access[self.CharID] != undefined){
        Object.assign(self,{
          ...access[self.CharID]
        })
      }
    })
    return characters
}

const make_acces =(characters)=>{
  const locs = {}
  Object.values(characters).forEach(self=>{
    Object.assign(locs,{[self.ShortName]:self.CharID})
  })
  return locs
}

export const getCharacters = () => ({
  type: GET_CHARACTERS
});

export const setCharacters = (characters, access) => ({
  type: SET_CHARACTERS,
  characters: merg_data(characters, access),
  access: make_acces(characters)
});

const initialState = {
  characters: undefined,
  access: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTERS:
      const { characters, access } = action;
      return { ...state, access: access, characters: characters };
    default:
      return state;
  }
};
