import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPSumFixPassiveNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/sum_fix_passive/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/sum_fix_passive/JPNew.json', { 'muteHttpExceptions': true })
  }
}
