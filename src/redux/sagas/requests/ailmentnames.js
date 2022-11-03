import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetAilmentNames() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/ailments/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/ailments.json',{'muteHttpExceptions': true})
}
}
