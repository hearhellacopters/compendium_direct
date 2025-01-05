import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetTransNames() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/index/transnames.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/transnames.json', { 'muteHttpExceptions': true })
  }
}
