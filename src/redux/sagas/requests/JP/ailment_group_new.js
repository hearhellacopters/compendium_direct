import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentGroupNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentgroup/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentgroup/JPNew.json', { 'muteHttpExceptions': true })
  }
}
