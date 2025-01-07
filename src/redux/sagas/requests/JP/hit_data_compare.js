import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPHitDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/hit_data/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/hit_data/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
