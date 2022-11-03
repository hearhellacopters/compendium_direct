import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemyNames() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/enemy_names/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/enemy_names.json',{'muteHttpExceptions': true})
}
}
