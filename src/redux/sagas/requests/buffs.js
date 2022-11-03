import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetBuffs() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/buffs',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/buffs.json',{'muteHttpExceptions': true})
}
}
