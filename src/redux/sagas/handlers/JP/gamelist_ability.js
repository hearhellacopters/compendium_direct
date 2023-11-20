import { call, put } from "redux-saga/effects";
import { setJPGameListAbility } from "../../../ducks/JP/gamelist_ability";
import { requestGetJPGameListAbility } from "../../requests/JP/gamelist_ability";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListAbility(action) {
  try {
    const response = yield call(requestGetJPGameListAbility);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_ability_jp");
      yield put(setJPGameListAbility(data));
    }
  } catch (error) {
    _error("gamelist_ability_jp", error.message);
  }
}
