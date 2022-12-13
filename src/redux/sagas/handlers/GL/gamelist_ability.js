import { call, put } from "redux-saga/effects";
import { setGLGameListAbility } from "../../../ducks/GL/gamelist_ability";
import { requestGetGLGameListAbility } from "../../requests/GL/gamelist_ability";
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListAbility(action) {
  try {
    const response = yield call(requestGetGLGameListAbility);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLGameListAbility(data));
    }
  } catch (error) {
    console.log(error);
  }
}
