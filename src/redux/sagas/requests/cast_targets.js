import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCastTargets() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/casttargets/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/casttargets.json',{'muteHttpExceptions': true})
}
}
