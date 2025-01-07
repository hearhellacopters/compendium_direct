import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLCommandGroupCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/command_group/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/command_group/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
