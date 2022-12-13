import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetMasterIndex() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/index/master_index/', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/master_index.json', { 'muteHttpExceptions': true })
  }
}
