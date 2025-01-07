import { call, put } from "redux-saga/effects";
import { setGLArtPassiveNew } from "../../../ducks/GL/art_passive_new";
import { requestGetGLArtPassiveNew } from "../../requests/GL/art_passive_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLArtPassiveNew(action) {
  try {
    const response = yield call(requestGetGLArtPassiveNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLArtPassiveNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
