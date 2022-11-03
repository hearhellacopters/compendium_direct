import { call, put } from "redux-saga/effects";
import { setGLGameListPassive } from "../../../ducks/GL/gamelist_passive";
import { requestGetGLGameListPassive } from "../../requests/GL/gamelist_passive";
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListPassive(action) {
  try {
    const response = yield call(requestGetGLGameListPassive);
    const { data } = response;
    if(isJson(data) == true){
        yield put(setGLGameListPassive(data));
    }
  } catch (error) {
    console.log(error);
  }
}
