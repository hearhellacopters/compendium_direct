import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLEnemyOptionCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/enemy_option/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/enemy_option/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
