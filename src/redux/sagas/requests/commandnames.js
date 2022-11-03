import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCommandNames() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/commands/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/commands.json',{'muteHttpExceptions': true})
}
}
