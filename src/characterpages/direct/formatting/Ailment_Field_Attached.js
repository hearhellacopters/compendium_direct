import React, {useState, useEffect} from 'react';
import Field_Effect_Pars from './Field_Effect_Pars';
import Slider from 'react-input-slider';
import SilderStyleRank from './SilderStyleRank';

const Ailment_Field_Attached =({
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
    base_color,
    ver
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

    const [currentrank, setcurrentrank] = useState(1)

    const handleChangeRank = (e) => {
        setcurrentrank(parseInt(e.x));
      };

    return (
        <div>
            {slider == true ?
               <div className={`sliderbase infonameholderenemybuff `}>
                    <div className="sliderspacer">
                        <div className="rankspacer">{`Rank: ${currentrank} / ${10}`}</div>
                        <Slider 
                        key={ailment_field}
                        styles={SilderStyleRank}
                        onChange={handleChangeRank}
                        x={currentrank} 
                        type="range" 
                        xmin={1} 
                        xmax={10} 
                        />
                    </div>
                </div>
                :""}
            <div>
            <Field_Effect_Pars
            match={ailment_field} 
            ver={ver}
            AilmentNames={AilmentNames} 
            CondData={CondData} 
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
            />
            </div>
            </div>

    )
}
export default Ailment_Field_Attached