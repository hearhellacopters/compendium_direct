import axios from "axios";

export function requestGetMaintenance() {
    return axios.get('https://dissidiacompendium.com/maint/enance.json',{'muteHttpExceptions': true})
}
