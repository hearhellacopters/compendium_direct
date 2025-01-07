import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentDefaultCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentdefault/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentdefault/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
