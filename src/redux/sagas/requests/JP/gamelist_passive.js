import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPGameListPassive() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/_m/gamelist/JP/PassiveList.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/JP/PassiveList.json', { 'muteHttpExceptions': true })
  }
}
