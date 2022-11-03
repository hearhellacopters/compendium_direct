import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetGear() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/gear',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/gear.json',{'muteHttpExceptions': true})
}
}
