import React, { useState } from 'react';
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'
import ReplacerCharacter from '../ReplacerCharacter';
import ailment_modify_trans from '../../processing/ailment/ailment_modify_trans';

export default function AilmentModifyFormatting ({
    modify,
    master_index,
    ver,
    formatting
}) {

    const ailment_id = master_index.ailments

    const ail_data = ailment_id[modify.id]

    const form = {formatting: formatting}
    const forma = {formatting: formatting, updown:true}

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const modify_str = ailment_modify_trans(
        modify,
        master_index,
        ver,
    )
   
    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="Dbanner infonameholderenemybuff" >
                    <DefaultTippy content="Click to show raw">
                        <div className="combotext clicky" onClick={() => showmeraw(showraw)}>
                            {ReplacerCharacter(`//${ail_data && ail_data.icon}// ${modify && modify.name} #${modify.id}`, form)}
                        </div>
                    </DefaultTippy>
                    <div className="abilityJPname">
                        {modify && modify.jpname != undefined ?
                            modify.jpname :
                            "unknown"}
                    </div>
                </div>
                <div className="introflex Dbase">
                    {ReplacerCharacter(modify_str, forma)}
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={modify} />
                        </span>
                    : ""}
                </div>
            </div>
        </div>
    )
  
}