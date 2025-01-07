import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentRankNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentrank/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentrank/GLNew.json', { 'muteHttpExceptions': true })
  }
}
