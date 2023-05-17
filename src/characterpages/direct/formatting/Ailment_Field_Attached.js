import React, { useState, useEffect } from 'react';
import Ailment_Field_Effect_Pars from './Ailment_Field_Effect_Pars';
import Ailment_Data_Pars_Handler from './Ailment_Data_Pars_Handler';
import Slider from 'react-input-slider';
import SilderStyleRank from './SilderStyleRank';

const Ailment_Field_Attached = ({
    ailment_field,
    loc,
    slider,
    castlocation,
    formatting,
    base_color,
    ver,
    master_index,
    spacer
}) => {

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

    const [currentrank, setcurrentrank] = useState(1)

    const handleChangeRank = (e) => {
        setcurrentrank(parseInt(e.x));
    };

    const field_data = Ailment_Field_Effect_Pars(
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
                : ""}
            <div>
                <Ailment_Data_Pars_Handler
                    effect_id={field_data}
                    slider={slider}
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
                    characterskb={currentrank}
                    formatting={formatting}
                    spacer={spacer}
                    castlocation={castlocation == undefined ? false : castlocation}
                />
            </div>
        </div>

    )
}
export default Ailment_Field_Attached