import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLHitDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/hit_data/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/hit_data/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
