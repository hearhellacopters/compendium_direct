import { call, put } from "redux-saga/effects";
import { setJPGameListGear } from "../../../ducks/JP/gamelist_gear";
import { requestGetJPGameListGear } from "../../requests/JP/gamelist_gear";
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListGear(action) {
  try {
    const response = yield call(requestGetJPGameListGear);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPGameListGear(data));
    }
  } catch (error) {
    console.log(error);
  }
}
