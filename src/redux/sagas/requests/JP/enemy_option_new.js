import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPEnemyOptionNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/enemy_option/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/enemy_option/JPNew.json', { 'muteHttpExceptions': true })
  }
}
