import { call, put } from "redux-saga/effects";
import { setAilmentGroupFull } from "../../ducks/ailment_group_full";
import { requestGetAilmentGroupFull } from "../requests/ailment_group_full";
import isJson from "./_JSON_CHECK";

export function* handleGetAilmentGroupFull(action) {
  try {
    const response = yield call(requestGetAilmentGroupFull);
    const { data } = response;
    if(isJson(data,"GetAilmentGroupFull") == true){
        yield put(setAilmentGroupFull(data));
    }
  } catch (error) {
    console.log(error);
  }
}
