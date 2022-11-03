import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSUM1Table() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/tables/summon1',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/tables/summon1.json',{'muteHttpExceptions': true})
}
}
