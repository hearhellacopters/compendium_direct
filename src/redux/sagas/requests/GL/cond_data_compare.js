import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLCondDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/cond_data/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/cond_data/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
