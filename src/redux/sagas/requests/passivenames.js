import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetPassiveNames() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/passives/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/passives.json',{'muteHttpExceptions': true})
}
}
