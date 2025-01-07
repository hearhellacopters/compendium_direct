import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentModifyNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/modify/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/modify/JPNew.json', { 'muteHttpExceptions': true })
  }
}
