import { call, put } from "redux-saga/effects";
import { setJPGameListAbility } from "../../../ducks/JP/gamelist_ability";
import { requestGetJPGameListAbility } from "../../requests/JP/gamelist_ability";
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListAbility(action) {
  try {
    const response = yield call(requestGetJPGameListAbility);
    const { data } = response;
    if(isJson(data) == true){
        yield put(setJPGameListAbility(data));
    }
  } catch (error) {
    console.log(error);
  }
}
