import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetPanels() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/panels',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/panels.json',{'muteHttpExceptions': true})
}
}
