import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentCombinationCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/combination/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/combination/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
