import { call, put } from "redux-saga/effects";
import { setJPArtPassiveNew } from "../../../ducks/JP/art_passive_new";
import { requestGetJPArtPassiveNew } from "../../requests/JP/art_passive_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPArtPassiveNew(action) {
  try {
    const response = yield call(requestGetJPArtPassiveNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPArtPassiveNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
