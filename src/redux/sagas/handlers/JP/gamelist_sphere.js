import { call, put } from "redux-saga/effects";
import { setJPGameListSphere } from "../../../ducks/JP/gamelist_sphere";
import { requestGetJPGameListSphere } from "../../requests/JP/gamelist_sphere";
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListSphere(action) {
  try {
    const response = yield call(requestGetJPGameListSphere);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPGameListSphere(data));
    }
  } catch (error) {
    console.log(error);
  }
}
