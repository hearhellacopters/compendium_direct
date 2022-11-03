import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCRYTable() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/tables/crystal',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/tables/crystal.json',{'muteHttpExceptions': true})
}
}
