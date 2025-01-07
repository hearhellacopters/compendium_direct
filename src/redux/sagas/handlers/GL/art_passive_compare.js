import { call, put } from "redux-saga/effects";
import { setGLArtPassiveCompare } from "../../../ducks/GL/art_passive_compare";
import { requestGetGLArtPassiveCompare } from "../../requests/GL/art_passive_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLArtPassiveCompare(action) {
  try {
    const response = yield call(requestGetGLArtPassiveCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLArtPassiveCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
