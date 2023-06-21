import React from "react"
import { useStateIfMounted } from "use-state-if-mounted";
import ReplacerCharacter from '../ReplacerCharacter'
import { ObjectView } from 'react-object-view'
import ailment_default_pars from "../../processing/ailment/ailment_default_pars";

export default function AilmentDefaultParsFormatting({
    default_data,
    passed_ailment,
    master_index,
    ver,
    formatting
}){

    const from = {formatting:formatting}

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const default_pars = ailment_default_pars(
        default_data,
        passed_ailment,
        master_index,
        ver
    )

    return (
        default_pars != "" ?
                <>
                    <div className="subpassiveflair cast_str" onClick={showmeraw}> 
                        {default_pars.cast_str}<span className="values">{default_pars.turns_str}</span>{default_pars.target_str}
                    </div>
                    <div className="p_note">
                        <div className="orangebar">Requires:</div>
                        {ReplacerCharacter(default_pars.require_str,from)}
                    </div>
                    {showraw == true ?
                    <span className='react-json-view'>
                        <ObjectView 
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        } 
                        data={default_data} 
                        />
                    </span>
                    : ""}
                </>
        : ""
    )
}