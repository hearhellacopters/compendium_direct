import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPGameListAbility() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/gamelist/JP/AbilityList', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/JP/AbilityList.json', { 'muteHttpExceptions': true })
  }
}
