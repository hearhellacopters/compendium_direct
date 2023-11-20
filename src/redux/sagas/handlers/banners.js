import { call, put } from "redux-saga/effects";
import { setBanners } from "../../ducks/banners";
import { requestGetBanners } from "../requests/banners";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetBanners(action) {
  try {
    const response = yield call(requestGetBanners);
    const { data } = response;
    if (isJson(data, "GetBanners") == true) {
      _error_remove("banners");
      yield put(setBanners(data));
    }
  } catch (error) {
    _error("banners", error.message);
  }
}
