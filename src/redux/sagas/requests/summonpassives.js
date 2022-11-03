import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSummonPassives() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/summonpassives',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/summonpassives.json',{'muteHttpExceptions': true})
}
}
