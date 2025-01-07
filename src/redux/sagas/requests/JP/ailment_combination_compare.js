import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentCombinationCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/combination/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/combination/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
