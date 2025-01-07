import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentFieldEffectsCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/fieldeffects/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/fieldeffects/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
