import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPGameListAilment() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/_dir/gamelist/JP/AilmentList',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/JP/AilmentList.json',{'muteHttpExceptions': true})
}
}
