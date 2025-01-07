import React, { useState } from 'react';
import ailment_field_effect_trans from '../../processing/ailment/ailment_field_effect_trans'
import AilmentDataEffectHandler from './AilmentDataEffectHandler';
import { ObjectView } from 'react-object-view'
import DefaultTippy from '../TippyDefaults';
import ReplacerCharacter from '../ReplacerCharacter';

export default function AilmentFieldStandalone ({
    ailment_field,
    castlocation,
    formatting,
    hide_type,
    ver,
    master_index,
    spacer,
    showvalues
}) {

    const form = {formatting:formatting}

    const AilmentNames = master_index.ailments
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames

    var highestlvl = 10

    if (ailment_field.max_level <= 10 && ailment_field.max_level != -1 && ailment_field.max_level != 0) {
        highestlvl = ailment_field.max_level
    }
    if (ailment_field.max_level_overide != undefined) {
        highestlvl =ailment_field.max_level_overide
    }

    const [showraw, setshowraw] = useState(false)
    const currentrank = 1

    const showmeraw = () => {
        setshowraw((prevValue) => !prevValue);
    }

    var icon = undefined
    var ailmentname = undefined
    var ailmentjpname = undefined
    var num_id = undefined

    if (ailment_field.abyss_id != undefined && ailment_field.abyss_id != -1) {
        icon = `//abyss//`
        ailmentname = `Abyss Level #${ailment_field.abyss_id}`
        ailmentjpname = `Abyss Level #${ailment_field.abyss_id}`
        num_id = ailment_field.abyss_id
    }

    if (ailment_field.ailment_id != undefined) {
        icon = AilmentNames[ailment_field.ailment_id] && `//${AilmentNames[ailment_field.ailment_id].icon}//`
        ailmentname = AilmentNames[ailment_field.ailment_id] && AilmentNames[ailment_field.ailment_id].name
        ailmentjpname = AilmentNames[ailment_field.ailment_id] && AilmentNames[ailment_field.ailment_id].jpname
        num_id = ailment_field.ailment_id
    }

    if (ailment_field.pa_id != undefined) {
        icon = `<smallpassive>`
        ailmentname = passivenames[ailment_field.pa_id] && passivenames[ailment_field.pa_id].name
        ailmentjpname = passivenames[ailment_field.pa_id] && passivenames[ailment_field.pa_id].jpname
        num_id = ailment_field.pa_id
    }

    if (ailment_field.weapon_pa_id != undefined) {
        icon = `<smallpassive>`
        ailmentname = equipmentpassivenames[ailment_field.weapon_pa_id] && equipmentpassivenames[ailment_field.weapon_pa_id].name
        ailmentjpname = equipmentpassivenames[ailment_field.weapon_pa_id] && equipmentpassivenames[ailment_field.weapon_pa_id].jpname
        num_id = ailment_field.weapon_pa_id
    }
    if(icon == undefined){
        icon = '//undefined//'
    }
    if(num_id == undefined){
        num_id = ailment_field.data_id
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
        <div className="buffunit">
            <div className="infoholder">
                <div className="infonameholderenemybuff bluebanner" >
                    <div className="infotitle">
                        <DefaultTippy content={"Click to show raw"}>
                            <span className="clicky" onClick={showmeraw}>
                                {ReplacerCharacter(`${icon} [${ailmentname}] #${num_id}`,form)}
                            </span>
                        </DefaultTippy>
                        {ailmentjpname == undefined || ailmentjpname == null ?
                            <div className="abilityJPname">
                                {"None テキストなし"}
                            </div>

                            : <div className="abilityJPname">
                                {ReplacerCharacter(ailmentjpname && ailmentjpname, form)}
                            </div>}
                    </div>
                </div>
                <div className="infobase bluebase">
                    <AilmentDataEffectHandler
                        effect_id={field_data}
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
                        currentbuffsmuliplysolo={currentrank}
                        currentgroupstacks={currentrank}
                        currentweaknessmuliply={currentrank}
                        currenthp={currentrank}
                        charactersleft={currentrank}
                        characterskb={currentrank}
                        formatting={formatting}
                        showvalues={showvalues}
                        castlocation={castlocation == undefined ? false : castlocation}
                        hide_type={hide_type}
                        spacer={spacer}
                    />
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        } 
                        data={{ raw: ailment_field, field_data: field_data }} />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}