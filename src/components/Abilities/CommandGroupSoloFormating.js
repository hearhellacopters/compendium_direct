import React, { useState } from 'react';
import ReplacerCharacter from '../ReplacerCharacter';
import Tippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'

export default function CommandGroupSoloFormating ({
    command_group,
    master_index,
    formatting
}) {

    const form = {formatting:formatting}

    const CommandNames = master_index.commands

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const EX_rename = (data) => {
        let replacement = data
        replacement = data == undefined ? "" : data.replace(/EX/, "EXrank")
        replacement = replacement == "" ? "" : replacement.replace(/BRV/, "brvattackicon")
        replacement = replacement == "" ? "" : replacement.replace(/HP/, "hpattackicon")
        replacement = replacement == "" ? "" : replacement.replace(/ /, "_")
        return replacement
    }

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="Buffbanner infonameholderenemybuff">
                    <Tippy content={"Show Raw"}>
                        <div style={{display: "inline"}} onClick={() => showmeraw(showraw)} className='clicky'>{`Command Group #${command_group.group_id_}`}</div>
                    </Tippy>
                </div>
                <div className="Buffbase infobase">

                    {command_group.list && command_group.list.length == 0 ? "*Empty*" : command_group.list.map((item, i) =>
                        ReplacerCharacter(`<${CommandNames[item] && CommandNames[item].rank == undefined ? "unknown" : EX_rename(CommandNames[item].rank)}> [${CommandNames[item] && CommandNames[item].name}] #${item}\n`,form)
                    )}
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={command_group} 
                        />
                        </span>
                    : ""}
                </div>
            </div>
        </div>
    )
}