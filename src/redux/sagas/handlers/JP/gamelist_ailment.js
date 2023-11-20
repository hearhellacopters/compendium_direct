import { call, put } from "redux-saga/effects";
import { setJPGameListAilment } from "../../../ducks/JP/gamelist_ailment";
import { requestGetJPGameListAilment } from "../../requests/JP/gamelist_ailment";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListAilment(action) {
  try {
    const response = yield call(requestGetJPGameListAilment);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_ailment_jp");
      yield put(setJPGameListAilment(data));
    }
  } catch (error) {
    _error("gamelist_ailment_jp", error.message);
  }
}
