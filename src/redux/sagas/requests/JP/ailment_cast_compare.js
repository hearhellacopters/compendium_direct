import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentCastCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/cast/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/cast/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
