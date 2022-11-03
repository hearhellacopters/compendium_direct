import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemiesDirect() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/enemies_direct',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/enemies_direct.json',{'muteHttpExceptions': true})
}
}
