import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPEXSkillNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ex_skill/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ex_skill/JPNew.json', { 'muteHttpExceptions': true })
  }
}
