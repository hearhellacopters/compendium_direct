import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSUM2Table() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/tables/summon2',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/tables/summon2.json',{'muteHttpExceptions': true})
}
}
