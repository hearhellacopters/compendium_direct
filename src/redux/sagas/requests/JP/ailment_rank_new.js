import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentRankNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentrank/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentrank/JPNew.json', { 'muteHttpExceptions': true })
  }
}
