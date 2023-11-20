import { call, put } from "redux-saga/effects";
import { setStickers } from "../../ducks/stickers";
import { requestGetStickers } from "../requests/stickers";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetStickers(action) {
  try {
    const response = yield call(requestGetStickers);
    const { data } = response;
    if (isJson(data, "GetStickers") == true) {
      _error_remove("stickers");
      yield put(setStickers(data));
    }
  } catch (error) {
    _error("stickers", error.message);
  }
}
