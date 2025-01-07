import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentDefaultCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentdefault/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentdefault/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
