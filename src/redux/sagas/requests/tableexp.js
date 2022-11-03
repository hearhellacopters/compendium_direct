import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEXPTable() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/tables/exp',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/tables/exp.json',{'muteHttpExceptions': true})
}
}
