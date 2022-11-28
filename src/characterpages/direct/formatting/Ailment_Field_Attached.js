import React, {useState, useEffect} from 'react';
import Field_Effect_Pars from './Field_Effect_Pars';
import Slider from 'react-input-slider';
import SilderStyleRank from './SilderStyleRank';

const Ailment_Field_Attached =({
    ailment_field,
    loc,
    slider,
    castlocation,
    formatting,
    base_color,
    ver,
    master_index,
    spacer
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
            master_index={master_index}

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
            spacer={spacer}
            />
            </div>
            </div>

    )
}
export default Ailment_Field_Attached