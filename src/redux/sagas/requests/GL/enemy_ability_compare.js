import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLEnemyAbilityCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/enemy_ability/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/enemy_ability/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
