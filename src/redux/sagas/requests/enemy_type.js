import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemyType() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/enemy_type/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/enemy_type.json',{'muteHttpExceptions': true})
}
}
