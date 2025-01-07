import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLCondDataNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/cond_data/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/cond_data/GLNew.json', { 'muteHttpExceptions': true })
  }
}
