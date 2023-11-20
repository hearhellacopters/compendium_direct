import { call, put } from "redux-saga/effects";
import { setJPGameListGear } from "../../../ducks/JP/gamelist_gear";
import { requestGetJPGameListGear } from "../../requests/JP/gamelist_gear";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListGear(action) {
  try {
    const response = yield call(requestGetJPGameListGear);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_gear_jp");
      yield put(setJPGameListGear(data));
    }
  } catch (error) {
    _error("gamelist_gear_jp", error.message);
  }
}
