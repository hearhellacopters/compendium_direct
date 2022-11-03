import { call, put } from "redux-saga/effects";
import { setGLGameListGear } from "../../../ducks/GL/gamelist_gear";
import { requestGetGLGameListGear } from "../../requests/GL/gamelist_gear";
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListGear(action) {
  try {
    const response = yield call(requestGetGLGameListGear);
    const { data } = response;
    if(isJson(data) == true){
        yield put(setGLGameListGear(data));
    }
  } catch (error) {
    console.log(error);
  }
}
