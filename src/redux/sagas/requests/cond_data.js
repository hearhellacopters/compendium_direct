import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCondData() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/cond/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/cond.json',{'muteHttpExceptions': true})
}
}
