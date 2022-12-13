import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLGameListPassive() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/gamelist/GL/PassiveList', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/GL/PassiveList.json', { 'muteHttpExceptions': true })
  }
}
