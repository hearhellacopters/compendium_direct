import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetPassives() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/passives',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/passives.json',{'muteHttpExceptions': true})
}
}
