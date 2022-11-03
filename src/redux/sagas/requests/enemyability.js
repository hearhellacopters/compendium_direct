import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemyAbility() {
  if(DevSwitch == true){
    return axios.get(`http://localhost:3001/data/enemies/abilities`,{'muteHttpExceptions': true})
  } 
  if(DevSwitch == false){
    return axios.get(`https://www.dissidiacompendium.com/data/enemies/abilities.json`,{'muteHttpExceptions': true})
}
}
