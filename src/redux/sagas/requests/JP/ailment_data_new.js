import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentDataNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailments/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailments/JPNew.json', { 'muteHttpExceptions': true })
  }
}
