import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPCommandGroupNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/command_group/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/command_group/JPNew.json', { 'muteHttpExceptions': true })
  }
}
