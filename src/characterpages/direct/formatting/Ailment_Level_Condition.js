import React,{useState,useEffect} from "react";
import require_trans_handler from './require_trans_handler'
import DefaultTippy from '../../../formatting/TippyDefaults';
import Format_Cleaner from '../../../processing/Format_Cleaner'

const Ailment_Level_Formatting =({
    cond_file,
    ver,
    loc,
    file,
    Single,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    ailment_group,
    command_group,
    CastNames,
    enemy_type,
    char_id,
    cast_targets,
    require_passive,
    passive_target,
    trap_type,
    param_id,
    attack_type,
    killer_type,
    elementid_1,
    command_type,
    target_range_
})=>{

    const [useJPtext, setuseJPtext] = useState(false)

    const usejptext = (state) =>{
        if(state == false){
            setuseJPtext(true)
        } else{
            setuseJPtext(false)
        }
    }


    var require_ = ""

    if(cond_file.require_id != -1){
    require_ = require_trans_handler(
        cond_file.require_id,
        cond_file.require_target,
        cond_file.require_value1,
        cond_file.require_value2,
        cond_file.require_value3,

        require_passive,
        passive_target,
        CommandNames,
        AilmentNames,
        elementid_1,
        attack_type,
        killer_type,
        command_group,
        ailment_group,
        trap_type,
        passivenames,
        equipmentpassivenames,
        enemy_type,
        command_type,
        target_range_
    )
    }

    return(
        <div className="buffunit">
        <div className="infoholder">
        <div className="Bbanner infonameholderenemybuff">
            <div className="faceandiconholder ">
            {`Level Condition Data #${cond_file.cond_id}`}
            </div>
        </div>
        <div className="Bbase infonameholderenemybuff default_passive">
        <DefaultTippy content={"Toggle Original Text"}>
            <div className="updatelink clicky intable" onClick={()=> usejptext(useJPtext)}>
            {useJPtext == true ?
            cond_file.desc != undefined ?
            <div>{cond_file.desc && Format_Cleaner(cond_file.desc)}
            </div> : 
            <div className={cond_file.trans} >
            {cond_file.trans && cond_file.trans}
            </div>
            : 
            cond_file.trans != undefined ?
            <div  >
                {cond_file.trans && cond_file.trans}
            </div> :
            <div >{cond_file.desc && Format_Cleaner(cond_file.desc)}
            </div>}

            </div>
            </DefaultTippy>
            
            <div className="blackbase infonameholderenemybuff default_passive">
            {require_ != "" ? 
                <div>
                Require:<br/>
                {"\xA0- " + require_}
                </div>
                :""}
                {`\xA0- Change: ${cond_file.change_value > 0 ? `+${cond_file.change_value}` : cond_file.change_value}`}
                {cond_file.unlock == 1 ?
                <div>
                    *Condition can cancel ailment
                </div>
                :""}
            </div>
        </div>
        </div>
        </div>
    )
}
export default Ailment_Level_Formatting