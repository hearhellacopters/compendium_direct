import playlist_addhandler from "../../processing/playlist/playlist_addhandler";
import playlist_updatehandler from "../../processing/playlist/playlist_updatehandler";
import playlist_removehandler from "../../processing/playlist/playlist_removehandler";

export const GET_PLAYLIST = "GET_PLAYLIST";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const ADD_PLAYLIST = "ADD_PLAYLIST";
export const GETADD_PLAYLIST = "GETADD_PLAYLIST";
export const SET_LIST1 = "SET_LIST1";
export const SET_LIST2 = "SET_LIST2";
export const SET_LIST3 = "SET_LIST3";
export const GET_LIST1 = "GET_LIST1";
export const GET_LIST2 = "GET_LIST2";
export const GET_LIST3 = "GET_LIST3";
export const SET_UPDATE = "SET_UPDATE";
export const GET_UPDATE = "GET_UPDATE";

export const SET_REMOVE = "SET_REMOVE";
export const GET_REMOVE = "GET_REMOVE";

export const SET_FULLLIST = "SET_FULLLIST";
export const GET_FULLLIST = "GET_FULLLIST";

export const getPlayList = () => ({
  type: GET_PLAYLIST,
});

export const getList1 = () => ({
  type: GET_LIST1,
});

export const getList2 = () => ({
  type: GET_LIST2,
});

export const getList3 = () => ({
  type: GET_LIST3,
});

export const getUpdate = () => ({
  type: GET_UPDATE,
});

export const getTrackUpdate = () => ({
  type: GETADD_PLAYLIST,
});

export const getRemove = () => ({
  type: GET_REMOVE,
});

export const setPlayList = (playlist) => ({
  type: SET_PLAYLIST,
  playlist: playlist
});

export const addTrack = (add_track) => ({
  type: ADD_PLAYLIST,
  add_track: add_track
});

export const setList1 = (list1) => ({
  type: SET_LIST1,
  list1: list1
});

export const setList2 = (list2) => ({
  type: SET_LIST2,
  list2: list2
});

export const setList3 = (list3) => ({
  type: SET_LIST3,
  list3: list3
});

export const setUpdate = (update) => ({
  type: SET_UPDATE,
  update: update
});

export const setRemove = (remove_track, full_list) => ({
  type: SET_REMOVE,
  remove_track: remove_track,
  full_list: full_list
});

export const setFullList = (full_list) => ({
  type: SET_FULLLIST,
  full_list: full_list
});

export const getFullList = (full_list) => ({
  type: GET_FULLLIST,
  full_list: full_list
});

const initialState = {
  playlist: undefined,
  add_track: undefined,
  list1: undefined,
  list2: undefined,
  list3: undefined,
  update: undefined,
  remove_track: undefined,
  full_list: undefined
};



export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST1:
      return { ...state, list1: action.list1 };
    case SET_LIST2:
      return { ...state, list2: action.list2 };
    case SET_LIST3:
      return { ...state, list3: action.list3 };
    case GET_LIST1:
      return { ...state, list1: state.list1 };
    case GET_LIST2:
      return { ...state, list2: state.list2 };
    case GET_LIST3:
      return { ...state, list3: state.list3 };
    case GET_PLAYLIST:
      return { ...state, playlist: state.playlist };
    case SET_PLAYLIST:
      return { ...state, playlist: action.playlist };
    case GET_UPDATE:
      return { ...state, update: state.update };
    case GET_REMOVE:
      return { ...state, remove_track: state.remove_track, full_list: state.full_list };
    case GETADD_PLAYLIST:
      return { ...state, add_track: state.add_track }
    case SET_FULLLIST:
      return { ...state, full_list: action.full_list };
    case GET_FULLLIST:
      return { ...state, full_list: state.full_list };
    case ADD_PLAYLIST:
      if (state.playlist == "master") {
        return { ...state, add_track: action.add_track }
      }
      if (state.playlist == "list1") {
        const addlist1 = playlist_addhandler(state.playlist, action.add_track, state)
        return { ...state, list1: addlist1, playlist: state.playlist, add_track: action.add_track }
      }
      if (state.playlist == "list2") {
        const addlist2 = playlist_addhandler(state.playlist, action.add_track, state)
        return { ...state, list2: addlist2, playlist: state.playlist, add_track: action.add_track }
      }
      if (state.playlist == "list3") {
        const addlist3 = playlist_addhandler(state.playlist, action.add_track, state)
        return { ...state, list3: addlist3, playlist: state.playlist, add_track: action.add_track }
      }
      return { ...state, add_track: action.add_track };
    case SET_UPDATE:
      if (state.playlist == "master") {
        return { ...state, update: action.update }
      }
      if (state.playlist == "list1") {
        const makelist1 = playlist_updatehandler(state.playlist, action.update, state)
        return { ...state, list1: makelist1, update: action.update, playlist: state.playlist }
      }
      if (state.playlist == "list2") {
        const makelist2 = playlist_updatehandler(state.playlist, action.update, state)
        return { ...state, list2: makelist2, update: action.update, playlist: state.playlist }
      }
      if (state.playlist == "list3") {
        const makelist3 = playlist_updatehandler(state.playlist, action.update, state)
        return { ...state, list3: makelist3, update: action.update, playlist: state.playlist }
      }
      return { ...state, update: action.update };

    case SET_REMOVE:
      if (state.playlist == "master") {
        const master_list = playlist_removehandler(state.playlist, action.remove_track, state, action.full_list)
        return { ...state, full_list: master_list, playlist: state.playlist, remove_track: action.remove_track }
      }
      if (state.playlist == "list1") {
        const addlist1 = playlist_removehandler(state.playlist, action.remove_track, state, action.full_list)
        return { ...state, list1: addlist1, playlist: state.playlist, remove_track: action.remove_track, full_list: action.full_list }
      }
      if (state.playlist == "list2") {
        const addlist2 = playlist_removehandler(state.playlist, action.remove_track, state, action.full_list)
        return { ...state, list2: addlist2, playlist: state.playlist, remove_track: action.remove_track, full_list: action.full_list }
      }
      if (state.playlist == "list3") {
        const addlist3 = playlist_removehandler(state.playlist, action.remove_track, state, action.full_list)
        return { ...state, list3: addlist3, playlist: state.playlist, remove_track: action.remove_track, full_list: action.full_list }
      }
      return { ...state, remove_track: action.remove_track, full_list: action.full_list };

    default:
      return state;
  }
};
