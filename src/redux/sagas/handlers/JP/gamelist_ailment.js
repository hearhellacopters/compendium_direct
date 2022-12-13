import { call, put } from "redux-saga/effects";
import { setJPGameListAilment } from "../../../ducks/JP/gamelist_ailment";
import { requestGetJPGameListAilment } from "../../requests/JP/gamelist_ailment";
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListAilment(action) {
  try {
    const response = yield call(requestGetJPGameListAilment);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPGameListAilment(data));
    }
  } catch (error) {
    console.log(error);
  }
}
