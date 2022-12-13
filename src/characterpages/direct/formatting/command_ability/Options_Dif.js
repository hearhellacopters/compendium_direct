import options_trans_handler from "../options_trans_handler";

const Options_Dif = (
    character_ability,
    ver,
    master_index
) => {

    var full_str = ""

    if (character_ability.options != undefined) {
        character_ability.options.forEach(self => {
            if (self.active != false) {
                const transdata = options_trans_handler(
                    "character", //character or enemy
                    self, //option data
                    "attached", //solo or attached
                    true, //show command ids

                    master_index,
                    ver
                )
                if (transdata && transdata.title_str != undefined) {
                    full_str = `${full_str}\xa0${transdata.label_str == "" ? "-" : "┬"} ${transdata.title_str}${transdata && transdata.passives && transdata.passives.length != 0 ? ` w/${transdata.passives.map(self => ` <${self.loc_tag && self.loc_tag}>`)}` : ""}\n`
                }
                if (transdata && transdata.label_str != "") {
                    full_str = `${full_str}\xa0└─ ${transdata.label_str}\n`
                }
            }
        })
    }

    return (
        full_str
    )
}
export default Options_Dif