import { call, put } from "redux-saga/effects";
import { setJPGameListSphere } from "../../../ducks/JP/gamelist_sphere";
import { requestGetJPGameListSphere } from "../../requests/JP/gamelist_sphere";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListSphere(action) {
  try {
    const response = yield call(requestGetJPGameListSphere);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_sphere_jp");
      yield put(setJPGameListSphere(data));
    }
  } catch (error) {
    _error("gamelist_sphere_jp", error.message);
  }
}
