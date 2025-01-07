import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentFieldNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/field/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/field/JPNew.json', { 'muteHttpExceptions': true })
  }
}
