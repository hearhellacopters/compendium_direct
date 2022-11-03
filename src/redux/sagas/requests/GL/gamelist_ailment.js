import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLGameListAilment() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/_dir/gamelist/GL/AilmentList',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/GL/AilmentList.json',{'muteHttpExceptions': true})
}
}
