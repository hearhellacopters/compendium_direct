import { call, put } from "redux-saga/effects";
import { setBanners } from "../../ducks/banners";
import { requestGetBanners } from "../requests/banners";
import isJson from "./_JSON_CHECK";

export function* handleGetBanners(action) {
  try {
    const response = yield call(requestGetBanners);
    const { data } = response;
    if (isJson(data, "GetBanners") == true) {
      yield put(setBanners(data));
    }
  } catch (error) {
    console.log(error);
  }
}
