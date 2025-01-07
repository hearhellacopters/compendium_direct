import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentGroupCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentgroup/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentgroup/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
