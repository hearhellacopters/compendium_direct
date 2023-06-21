import ailment_rank_between_10 from "./ailment_rank_between_10.js"

export default function ailment_level_icon(ailment_data, level){
    var {icon, leveled_icon, max_level} = ailment_data
    icon = icon || "undefined"
    if(leveled_icon == true){
        if(!isNaN(+icon)){
            icon = Number(+icon) + (ailment_rank_between_10(level)-1)
        } else {
            icon = icon.replace(/(up|down|harp|punch|shield|throwing|staff|support)(\d+)/i,`$1${ailment_rank_between_10(level)}${level==max_level?"gold":""}`)
        }
    } else {
        if(max_level && max_level > -1){
            icon = icon.replace(/(up|down|harp|punch|shield|throwing|staff|support)(\d+)/i,`$1${ailment_rank_between_10(level)}${level==max_level?"gold":""}`)
        }
    }
    return icon
}