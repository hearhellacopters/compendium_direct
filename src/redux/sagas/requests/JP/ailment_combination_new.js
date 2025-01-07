import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentCombinationNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/combination/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/combination/JPNew.json', { 'muteHttpExceptions': true })
  }
}
