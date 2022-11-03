import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetUpdates() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/update',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/update.json',{'muteHttpExceptions': true})
}
}
