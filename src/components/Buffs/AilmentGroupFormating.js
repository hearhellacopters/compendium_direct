import React, { useState } from 'react';
import ReplacerCharacter from '../ReplacerCharacter';
import Tippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'

export default function AilmentGroupFormating ({
    ailment_group,
    master_index,
    ver,
    formatting
}) {

    const form = {formatting:formatting}

    const AilmentNames = master_index.ailments

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    if (ailment_group.list && ailment_group.list.length == 0) {
        return (
            <div className="buffunit">
                <div className="infoholder">
                    <div className="Buffbanner infonameholderenemybuff">
                        <Tippy content={"Show Raw"}>
                            <div onClick={() => showmeraw(showraw)} className='clicky'>{`Ailment Group #${ailment_group.group_id_}`}</div>
                        </Tippy>
                    </div>
                    <div className="Buffbase infobase">
                        *Empty*
                        {showraw == true ?
                            <span className='react-json-view'>
                            <ObjectView
                            options={
                                {
                                hideDataTypes: true,
                                expandLevel: 1
                                }
                            }
                            data={ailment_group} />
                            </span>
                            : ""}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="Buffbanner infonameholderenemybuff">
                    <Tippy content={"Show Raw"}>
                        <div style={{display: "inline"}} onClick={() => showmeraw(showraw)} className='clicky'>{`Ailment Group #${ailment_group.group_id_}`}</div>
                    </Tippy>
                </div>
                <div className="Buffbase infobase">
                    {ailment_group.list && ailment_group.list.map((item, i) =>
                        <div key={i}>
                            {item && ReplacerCharacter(`//${AilmentNames[item] && AilmentNames[item].icon}// [${AilmentNames[item] && AilmentNames[item].name}] #${item}`,form)}
                        </div>
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
                        data={ailment_group} 
                        />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}