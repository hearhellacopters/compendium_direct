import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPEnemyAbilityCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/enemy_ability/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/enemy_ability/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
