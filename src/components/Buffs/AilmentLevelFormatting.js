import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import require_trans from "../../processing/passives/require_trans";
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'
import format_cleaner from '../../processing/format_cleaner'

export default function AilmentLevelFormatting ({
    cond_file,
    ver,
    master_index,
}) {
    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const [useJPtext, setuseJPtext] = useState(false)

    const usejptext = (state) => {
        if (state == false) {
            setuseJPtext(true)
        } else {
            setuseJPtext(false)
        }
    }

    var require_ = ""

    if (cond_file.require_id != -1) {
        require_ = require_trans(
            cond_file.require_id,
            cond_file.require_target,
            cond_file.require_value1,
            cond_file.require_value2,
            cond_file.require_value3,

            master_index,
            ver
        )
    }

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="Bbanner infonameholderenemybuff">
                    <DefaultTippy content="Display Raw" className="tooltip" >
                        <div className="faceandiconholder clicky" onClick={() => showmeraw(showraw)}>
                            {`Level Condition Data #${cond_file.cond_id}`}
                        </div>
                    </DefaultTippy>
                </div>
                <div className="Bbase infonameholderenemybuff default_passive">
                    <DefaultTippy content={"Toggle Original Text"}>
                        <div className="updatelink clicky intable" onClick={() => usejptext(useJPtext)}>
                            {useJPtext == true ?
                                cond_file.desc != undefined ?
                                    <div>{cond_file.desc && format_cleaner(cond_file.desc)}
                                    </div> :
                                    <div className={cond_file.trans} >
                                        {cond_file.trans && cond_file.trans}
                                    </div>
                                :
                                cond_file.trans != undefined ?
                                    <div  >
                                        {cond_file.trans && cond_file.trans}
                                    </div> :
                                    <div >{cond_file.desc && format_cleaner(cond_file.desc)}
                                    </div>}

                        </div>
                    </DefaultTippy>

                    <div className="blackbase infonameholderenemybuff default_passive">
                        {require_ != "" ?
                            <div>
                                Require:<br />
                                {"\xA0- " + require_}
                            </div>
                            : ""}
                        {`\xA0- Change: ${cond_file.change_value > 0 ? `+${cond_file.change_value}` : cond_file.change_value}`}
                        {cond_file.unlock == 1 ?
                            <div>
                                *Condition can cancel ailment
                            </div>
                            : ""}
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
                        data={cond_file} 
                        />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}