import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPSumFixPassiveCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/sum_fix_passive/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/sum_fix_passive/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
