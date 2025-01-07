import { call, put } from "redux-saga/effects";
import { setJPArtPassiveCompare } from "../../../ducks/JP/art_passive_compare";
import { requestGetJPArtPassiveCompare } from "../../requests/JP/art_passive_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPArtPassiveCompare(action) {
  try {
    const response = yield call(requestGetJPArtPassiveCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPArtPassiveCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
