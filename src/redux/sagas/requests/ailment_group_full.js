import axios from "axios";
import DevSwitch from '../../DevSwitch'

export function requestGetAilmentGroupFull() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/ailmentgroup/Full/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentgroup/Full.json',{'muteHttpExceptions': true})
}
}
