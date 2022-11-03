import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemyBuffs() {
  if(DevSwitch == true){
    return axios.get(`http://localhost:3001/data/enemies/buffs`,{'muteHttpExceptions': true})
  } 
  if(DevSwitch == false){
    return axios.get(`https://www.dissidiacompendium.com/data/enemies/buffs.json`,{'muteHttpExceptions': true})
}
}
