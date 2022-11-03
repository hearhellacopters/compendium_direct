import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetAbilities() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/abilities',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/abilities.json',{'muteHttpExceptions': true})
}
}
