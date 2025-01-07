import React, { useState } from "react";
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'
import ReplacerCharacter from '../ReplacerCharacter'
import ailment_combination_trans from "../../processing/ailment/ailment_combination_trans";

export default function AilmentCombinationFormatting ({
    components,
    master_index,
    ver,
    formatting,
    base_id
}) {

    const form ={formatting:formatting}

    const AilmentNames = master_index.ailments

    const ailment_data = AilmentNames[components.ailment_id]

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const comp_str = ailment_combination_trans(
        components,
        master_index,
        ver,
        base_id
    )

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="bluebanner infonameholderenemybuff" >
                    <DefaultTippy content="Click to show raw">
                        <div className="combotext clicky" onClick={() => showmeraw(showraw)}>{ReplacerCharacter(`//${ailment_data && ailment_data.icon}// ${ailment_data && ailment_data.name} #${components.ailment_id}`,form)}</div>
                    </DefaultTippy>
                    <div className="abilityJPname">
                        {ailment_data && ailment_data.jpname != undefined ?
                            ReplacerCharacter(ailment_data.jpname, form) :
                            "Unknown"}
                    </div>
                </div>
                <div className="introflex bluebase">
                    <div className="subpassiveflair2">
                        {ReplacerCharacter(comp_str, form)}
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
                            data={components} 
                            />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}