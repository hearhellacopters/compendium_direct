import React, {useState, useEffect} from 'react';
import replacer_title from '../../processing/replacer_titles'

const Ailment_Level_Settings =({
    levelsettings
})=>{

    const colormaker = (text) =>{
        const cancelcheck = text && text.includes("Cancel")
        if(cancelcheck == true){
            return "Cancel"
        }
        const triggercheck = text && text.includes("Trigger")
        if(triggercheck == true){
            return "Trigger"
        }
        const tickcheck = text && text.includes("Tick")
        if(tickcheck == true){
            return "Tick"
        }
        const pausecheck = text && text.includes("Pause")
        if(pausecheck == true){
            return "Pause"
        }
        const increase = text && text.includes("Increase")
        if(increase == true){
            return "Increase"
        }
    }

    return(
        <div className="introflex blackbase">
            <div className="unqiue">Level Conditions:</div>
            <hr/>
            {levelsettings.map((item, i) => 
            item != undefined ?
            <div className={colormaker(item)} key={i}>
                {item && replacer_title(item)}
            </div> 
            :"")}
        </div>
    )
}
export default Ailment_Level_Settings