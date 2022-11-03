import { call, put } from "redux-saga/effects";
import { setGLGameListAilment } from "../../../ducks/GL/gamelist_ailment";
import { requestGetGLGameListAilment } from "../../requests/GL/gamelist_ailment";
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListAilment(action) {
  try {
    const response = yield call(requestGetGLGameListAilment);
    const { data } = response;
    if(isJson(data) == true){
        yield put(setGLGameListAilment(data));
    }
  } catch (error) {
    console.log(error);
  }
}
