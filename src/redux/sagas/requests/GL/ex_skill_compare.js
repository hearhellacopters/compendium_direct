import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLEXSkillCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ex_skill/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ex_skill/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
