import { call, put } from "redux-saga/effects";
import { setArtPassiveNames } from "../../ducks/artpassivenames";
import { requestGetArtPassiveNames } from "../requests/artpassivenames";
import isJson from "./_JSON_CHECK";

export function* handleGetArtPassiveNames(action) {
  try {
    const response = yield call(requestGetArtPassiveNames);
    const { data } = response;
    if(isJson(data,"GetArtPassiveNames") == true){
      yield put(setArtPassiveNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
