import axios from "axios";
import DevSwitch from '../../DevSwitch'

export function requestGetEnemyResistFull() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/enemy_resist/Full/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/enemy_resist/Full.json',{'muteHttpExceptions': true})
}
}
