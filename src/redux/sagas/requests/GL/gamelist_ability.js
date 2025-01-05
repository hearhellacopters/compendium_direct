import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLGameListAbility() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/_m/gamelist/GL/AbilityList.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/GL/AbilityList.json', { 'muteHttpExceptions': true })
  }
}
