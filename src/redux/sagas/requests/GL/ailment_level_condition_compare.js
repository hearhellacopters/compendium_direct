import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentLevelContCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailment_level_condition/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailment_level_condition/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
