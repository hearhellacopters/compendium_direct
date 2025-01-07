import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentRankCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentrank/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentrank/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
