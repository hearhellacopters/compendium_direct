import React, {useState, useEffect} from "react";
import options_trans_handler from "../options_trans_handler";
import reactStringReplace from "react-string-replace"
import replacer_titles from '../../../../processing/replacer_titles'
import Capped from "../../../../processing/capped";
import replacer_buff from '../../../../processing/replacer_buffcontent'

const Character_Option_Pars=({
    character_option,
    ver,
    loc,
    file,
    Single,

    formatting,
    all_options,

    master_index
})=>{

    const transdata = options_trans_handler(
        "character", //character or enemy
        character_option, //option data
        "attached", //solo or attached
        true, //show command ids

        master_index,
        ver
    )

    const addformatting =(text,switching)=>{
        if(formatting != true){
        let replacement = text
        var number = 0


        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
            number = number + 1
            return(
                <span key={`1-${i}-${number}`} className="unique">{match}</span>
            )
        })
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
            number = number + 1
            return(
                <Capped key={`2-${i}-${number}`} text={match}/>
        )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
            number = number + 1
            return(
                <br key={`10-${i}-${number}`}/>
        )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
            number = number + 1
            return(
                <br key={`11-${i}-${number}`}/>
        )})
        return(
            replacement
        )
        } else {
            if(switching == "tl"){
                return replacer_titles(text)
            }
            if(switching == "bu"){
                return replacer_buff(text)
            }
        }
    }

    if(all_options != undefined && all_options == false && character_option.active == false ){
        return(
            ""
        )
    }else{
        return(
            <div >
                <div >
                {transdata && transdata.title_str && addformatting(`\xa0${transdata.label_str == "" ? "-" : "┬"} ${transdata.title_str}${transdata && transdata.passives && transdata.passives.length != 0 ? ` w/${transdata.passives.map(self=>` <${self.loc_tag && self.loc_tag}>`)}` :""}`,"tl")}
                </div>

                {transdata && transdata.label_str != "" ?
                <div>
                {`\xa0${"└─"} `}{addformatting(transdata.label_str,"tl")}
                </div>
                :""
                }
            </div>
        )
    }    
}
export default Character_Option_Pars