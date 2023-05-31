import React, { useState, useEffect } from 'react';
import Ailment_Field_Effect_Pars from './Ailment_Field_Effect_Pars';
import Ailment_Data_Pars_Handler from './Ailment_Data_Pars_Handler';
import ReactJson from '@microlink/react-json-view'

const Ailment_Field_Attached_State = ({
    ailment_field,

    loc,
    slider,
    castlocation,
    formatting,
    hide_type,
    ver,
    hide_disp,
    spacer,
    master_index,
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

    const [showraw, setshowraw] = useState(false)
    const [currentrank, setcurrentrank] = useState(1)

    const showmeraw = () => {
        setshowraw((prevValue) => !prevValue);
    }

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
        ailment_field,
        master_index
    )

    if (hide_disp == true || ailment_field.no_show == true) {
        return (
            ""
        )
    } else {
        return (
            <div >
                <Ailment_Data_Pars_Handler
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
                />
                {showraw == true ?
                    <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={ailment_field} />
                    : ""}
            </div>
        )
    }
}
export default Ailment_Field_Attached_State