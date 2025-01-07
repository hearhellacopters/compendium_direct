import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLEnemyOptionNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/enemy_option/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/enemy_option/GLNew.json', { 'muteHttpExceptions': true })
  }
}
