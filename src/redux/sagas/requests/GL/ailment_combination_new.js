import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentCombinationNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/combination/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/combination/GLNew.json', { 'muteHttpExceptions': true })
  }
}
