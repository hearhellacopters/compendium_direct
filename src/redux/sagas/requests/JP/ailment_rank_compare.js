import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentRankCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentrank/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentrank/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
