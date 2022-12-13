import { call, put } from "redux-saga/effects";
import { setJukeBox } from "../../ducks/jukebox";
import { requestGetJukeBox } from "../requests/jukebox";
import isJson from "./_JSON_CHECK";

export function* handleGetJukeBox(action) {
  try {
    const response = yield call(requestGetJukeBox);
    const { data } = response;
    if (isJson(data, "GetJukeBox") == true) {
      yield put(setJukeBox(data));
    }
  } catch (error) {
    console.log(error);
  }
}
