import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemies() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/enemies',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/enemies.json',{'muteHttpExceptions': true})
}
}
