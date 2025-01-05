import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPGameListGear() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/_m/gamelist/JP/GearList.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/JP/GearList.json', { 'muteHttpExceptions': true })
  }
}
