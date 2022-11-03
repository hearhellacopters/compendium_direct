import { call, put } from "redux-saga/effects";
import { setPanels } from "../../ducks/panels";
import { requestGetPanels } from "../requests/panels";
import isJson from "./_JSON_CHECK";

export function* handleGetPanels(action) {
  try {
    const response = yield call(requestGetPanels);
    const { data } = response;
    if(isJson(data,"GetPanels") == true){
      yield put(setPanels(data));
    }
  } catch (error) {
    console.log(error);
  }
}
