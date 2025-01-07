import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLFileListCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/filelist/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/filelist/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
