import { call, put } from "redux-saga/effects";
import { setCommandGroupFull } from "../../ducks/command_group_full";
import { requestGetCommandGroupFull } from "../requests/command_group_full";
import isJson from "./_JSON_CHECK";

export function* handleGetCommandGroupFull(action) {
  try {
    const response = yield call(requestGetCommandGroupFull);
    const { data } = response;
    if(isJson(data,"GetCommandGroupFull") == true){
        yield put(setCommandGroupFull(data));
    }
  } catch (error) {
    console.log(error);
  }
}
