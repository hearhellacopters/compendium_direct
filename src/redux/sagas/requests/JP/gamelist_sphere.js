import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPGameListSphere() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/gamelist/JP/SphereList', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/gamelist/JP/SphereList.json', { 'muteHttpExceptions': true })
  }
}
