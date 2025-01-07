import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPEXSkillCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ex_skill/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ex_skill/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
