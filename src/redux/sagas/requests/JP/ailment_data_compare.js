import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailments/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailments/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
