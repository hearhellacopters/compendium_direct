import React, { useState, useEffect } from 'react';
import ailment_field_effect_trans from '../../processing/ailment/ailment_field_effect_trans';
import AilmentDataEffectHandler from './AilmentDataEffectHandler';
import { ObjectView } from 'react-object-view'

export default function AilmentFieldAttached({
    ailment_field,
    loc,
    slider,
    castlocation,
    formatting,
    hide_type,
    ver,
    hide_disp,
    master_index,
    spacer,
    battle_state
}){

    const [highestlvl, setHighestlvl] = useState(10);

    useEffect(() => {
        if (ailment_field.max_level <= 10 && ailment_field.max_level != -1 && ailment_field.max_level != 0) {
            setHighestlvl(ailment_field.max_level)
        }
        if (ailment_field.max_level_overide != undefined) {
            setHighestlvl(ailment_field.max_level_overide)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [showraw, setshowraw] = useState(false)
    const [currentrank, setcurrentrank] = useState(1)

    const showmeraw = () => {
        setshowraw((prevValue) => !prevValue);
    }

    if (hide_disp == true || ailment_field.no_show == true) {
        return (
            ""
        )
    }

    const field_data = ailment_field_effect_trans(
        ailment_field,
        false, //Single

        undefined, //is_buff
        undefined, //AugValue1
        undefined, //AugValue2
        highestlvl, //max_level
        currentrank, //rank
        undefined, //alt_rank
        undefined, //alt_aug1
        undefined, //alt_aug2
        ver,
        undefined,
        master_index
    )

    return (
        <span onClick={showmeraw}>
            {field_data && 
             field_data.hidden != true &&
             <AilmentDataEffectHandler
                effect_id={field_data}
                slider={slider}
                currentrank={currentrank}
                currentlevel={currentrank}
                currentturns={currentrank}
                currentenemies={currentrank}
                currentstacks={currentrank}
                currentdebuffsranks={currentrank}
                currentdebuffsranks2={currentrank}
                currentdebuffsmuliply={currentrank}
                currentbuffsranks={currentrank}
                currentfieldbuffsranks={currentrank}
                currentbuffsmuliply={currentrank}
                currentgroupstacks={currentrank}
                currenthp={currentrank}
                charactersleft={currentrank}
                characterskb={currentrank}
                formatting={formatting}
                castlocation={castlocation == undefined ? false : castlocation}
                hide_type={hide_type}
                spacer={spacer}
            />}
             {showraw == true ?
                <span className='react-json-view'>
                    <ObjectView 
                    options={
                        {
                            hideDataTypes: true,
                            expandLevel: 1
                        }
                        }
                    data={ailment_field} 
                    />
                </span>
            : ""}
        </span>
    )
}