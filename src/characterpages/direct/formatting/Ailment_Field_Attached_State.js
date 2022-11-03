import React, {useState, useEffect} from 'react';
import Field_Effect_Pars from './Field_Effect_Pars';
import ReactJson from '@microlink/react-json-view'

const Ailment_Field_Attached_State =({
    ailment_field,
    ailment_group,
    command_group,
    AilmentNames,
    CastNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_FFSeries,
    MessageData_Category,
    loc,
    slider,
    castlocation,
    formatting,
    char_id,
    hide_type,
    ver,
    hide_disp
})=>{

    const [highestlvl, setHighestlvl] = useState(10);

    useEffect(()=>{
        if(ailment_field.max_level <= 10 && ailment_field.max_level != -1 && ailment_field.max_level != 0){
            setHighestlvl(ailment_field.max_level)
        }
        if(ailment_field.max_level_overide != undefined){
            setHighestlvl(ailment_field.max_level_overide)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [showraw,setshowraw] = useState(false)
    const [currentrank, setcurrentrank] = useState(1)

    const showmeraw = ()=>{
        setshowraw((prevValue) => !prevValue);
    }

    const handleChangeRank = (e) => {
        setcurrentrank(parseInt(e.x));
      };

    if(hide_disp == true || ailment_field.no_show == true){
        return(
            ""
        )
    } else {
        return (
            <div >
                <Field_Effect_Pars
                match={ailment_field} 
                AilmentNames={AilmentNames} 
                CondData={CondData} 
                ver={ver}
                base_buff={ailment_field}
                MessageData_FFSeries={MessageData_FFSeries}
                MessageData_Category={MessageData_Category}
                CastNames={CastNames}
                CommandNames={CommandNames}
                ailment_group={ailment_group}
                command_group={command_group}
                Ailment_Effects={Ailment_Effects}
                is_buff={undefined}
                loc={loc}
                slider={slider}
                castlocation={castlocation == undefined ? false : castlocation}
                currentrank={currentrank}
                currentlevel={currentrank}
                currentturns={currentrank}
                currentenemies={currentrank}
                currentstacks={currentrank}
                currentdebuffsranks={currentrank}
                currentdebuffsmuliply={currentrank}
                currentbuffsranks={currentrank}
                currentfieldbuffsranks={currentrank}
                currentbuffsmuliply={currentrank}
                currentgroupstacks={currentrank}
                currenthp={currentrank}
                charactersleft={currentrank}
                formatting={formatting}
                alt_rank={undefined}
                alt_aug1={undefined}
                alt_aug2={undefined}
                char_id={char_id}
                hide_type={hide_type}
                />
                {showraw == true?
                <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={ailment_field}/>
                :""}
                </div>
        )
    }
}
export default Ailment_Field_Attached_State