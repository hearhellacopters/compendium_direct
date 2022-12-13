import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPGameListPassive() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/gamelist/JP/PassiveList', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/JP/PassiveList.json', { 'muteHttpExceptions': true })
  }
}
