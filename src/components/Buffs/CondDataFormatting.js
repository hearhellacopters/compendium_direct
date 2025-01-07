import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import cond_data_trans from "../../processing/ailment/cond_data_trans";
import ReplacerCharacter from "../ReplacerCharacter";
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'

export default function CondDataFormatting ({
    cond_file,
    ver,
    master_index,
    formatting
}) {

    const form = {formatting:formatting}

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const string = cond_data_trans(
        cond_file,
        ver,
        master_index
    )

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="Dbanner infonameholderenemybuff">
                    <DefaultTippy content="Display Raw" className="tooltip" >
                        <div style={{display: "inline"}} className="faceandiconholder clicky" onClick={() => showmeraw(showraw)}>
                            {`Condition Data #${cond_file.cond_id}`}
                        </div>
                    </DefaultTippy>
                </div>
                <div className="Dbase infonameholderenemybuff default_passive">
                    {ReplacerCharacter(string,form)}
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={cond_file} />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}