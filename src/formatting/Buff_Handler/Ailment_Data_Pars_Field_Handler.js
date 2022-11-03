import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import replacer from '../../processing/replacer_buffcontent'

const Ailment_Data_Pars_Field_Handler = ({
    effect_id,
    slider,
    currentrank,
    castlocation,
    currentlevel,
    currentturns,
    currentenemies,
    currentstacks,
    currentdebuffsranks,
    currentdebuffsmuliply,
    currentbuffsranks,
    currentfieldbuffsranks,
    currentbuffsmuliply,
    currentgroupstacks,
    currenthp,
    charactersleft
}) =>{

    const [rank,setrank] = useStateIfMounted(effect_id && effect_id.rank1)
    const [override,setoverride] =useStateIfMounted(false)
    const [displayrank,setdisplayrank] = useStateIfMounted(rank)

    useEffect(()=>{
        if(override!=true){
            //ranks
            if(effect_id && effect_id.slidertype == "ranks" && castlocation == false){
                if(currentrank <= 1){
                    setrank(effect_id && effect_id.rank1)
                }
                if(currentrank == 2){
                    setrank(effect_id && effect_id.rank2)
                }
                if(currentrank == 3){
                    setrank(effect_id && effect_id.rank3)
                }
                if(currentrank == 4){
                    setrank(effect_id && effect_id.rank4)
                }
                if(currentrank == 5){
                    setrank(effect_id && effect_id.rank5)
                }
                if(currentrank == 6){
                    setrank(effect_id && effect_id.rank6)
                }
                if(currentrank == 7){
                    setrank(effect_id && effect_id.rank7)
                }
                if(currentrank == 8){
                    setrank(effect_id && effect_id.rank8)
                }
                if(currentrank == 9){
                    setrank(effect_id && effect_id.rank9)
                }
                if(currentrank >= 10){
                    setrank(effect_id && effect_id.rank10)
                }
            } 
            if(effect_id && effect_id.slidertype == "ranks" && castlocation == true){
                if(effect_id && effect_id.defaultrank <= 1){
                    setrank(effect_id && effect_id.rank1)
                }
                if(effect_id && effect_id.defaultrank == 2){
                    setrank(effect_id && effect_id.rank2)
                }
                if(effect_id && effect_id.defaultrank == 3){
                    setrank(effect_id && effect_id.rank3)
                }
                if(effect_id && effect_id.defaultrank == 4){
                    setrank(effect_id && effect_id.rank4)
                }
                if(effect_id && effect_id.defaultrank == 5){
                    setrank(effect_id && effect_id.rank5)
                }
                if(effect_id && effect_id.defaultrank == 6){
                    setrank(effect_id && effect_id.rank6)
                }
                if(effect_id && effect_id.defaultrank == 7){
                    setrank(effect_id && effect_id.rank7)
                }
                if(effect_id && effect_id.defaultrank == 8){
                    setrank(effect_id && effect_id.rank8)
                }
                if(effect_id && effect_id.defaultrank == 9){
                    setrank(effect_id && effect_id.rank9)
                }
                if(effect_id && effect_id.defaultrank >= 10){
                    setrank(effect_id && effect_id.rank10)
                }
            }
        //levels
        if(effect_id && effect_id.slidertype == "levels" && currentlevel <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "levels"  && currentlevel >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //turns
        if(effect_id && effect_id.slidertype == "turns" && currentturns <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "turns" && currentturns >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //enemies
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "enemies" && currentenemies >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //stacks
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "stacks" && currentstacks >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //groupstacks
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //debuffsrank
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //buffsrank
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks >= 10){
            setrank(effect_id && effect_id.rank10)
        }
        //fieldbuffsrank
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks <= 1){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 2){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 3){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 4){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 5){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 6){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 7){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 8){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks == 9){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks >= 10){
            setrank(effect_id && effect_id.rank10)
        }

        //currenthp backwards
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank10 && effect_id && effect_id.rank10.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank10)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank9 && effect_id && effect_id.rank9.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank9)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank8 && effect_id && effect_id.rank8.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank8)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank7 && effect_id && effect_id.rank7.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank7)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank6 && effect_id && effect_id.rank6.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank6)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank5 && effect_id && effect_id.rank5.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank5)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank4 && effect_id && effect_id.rank4.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank4)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank3 && effect_id && effect_id.rank3.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank3)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank2 && effect_id && effect_id.rank2.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "currenthp" && 
        effect_id && effect_id.rank1 && effect_id && effect_id.rank1.value3 <= currenthp
        ){
            setrank(effect_id && effect_id.rank1)
        }

        //charactersleft
        if(effect_id && effect_id.slidertype == "charactersleft" && charactersleft <= 0){
            setrank(effect_id && effect_id.rank1)
        }
        if(effect_id && effect_id.slidertype == "charactersleft" && charactersleft == 1){
            setrank(effect_id && effect_id.rank2)
        }
        if(effect_id && effect_id.slidertype == "charactersleft" && charactersleft == 2){
            setrank(effect_id && effect_id.rank3)
        }

        }
        if(effect_id && effect_id.multiply == false){
            setdisplayrank(rank)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[override,rank,castlocation,currenthp,charactersleft,currentgroupstacks,currentfieldbuffsranks, currentbuffsranks,currentdebuffsranks,currentenemies,currentstacks,currentturns, slider, currentrank, effect_id, currentlevel, setrank])

    useEffect(()=>{
        if(effect_id && effect_id.multiply == true){
            if(effect_id && effect_id.multiplyslider == "debuffsmuliply"){
                const holder = rank && rank.value1 * (currentdebuffsmuliply - 1)
                setdisplayrank({value1: holder})
            }
            if(effect_id && effect_id.multiplyslider == "buffsmuliply"){
                const holder = rank && rank.value1 * (currentbuffsmuliply - 1)
                setdisplayrank({value1: holder})
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentdebuffsmuliply,currentbuffsmuliply,effect_id,rank])

    const [brv_cap,set_brv_cap] = useStateIfMounted(0)
    const [max_brv_cap,set_max_brv_cap] = useStateIfMounted(0)

    useEffect(()=>{
        if(rank && rank.value1 != undefined){
            if(typeof rank.value1 == "number"){
                set_brv_cap(Math.round(rank.value1 * 100))
                set_max_brv_cap(Math.round(rank.value1 * 1000))
            }
        }
    },[rank,set_max_brv_cap,set_brv_cap])

    useEffect(()=>{
        if(displayrank && displayrank.value1 != undefined){
            if(typeof displayrank.value1 == "number"){
                set_brv_cap(Math.round(displayrank.value1 * 100))
                set_max_brv_cap(Math.round(displayrank.value1 * 1000))
            }
        }
    },[displayrank,set_max_brv_cap,set_brv_cap])

    const seteffect = (value)=>{
        setoverride(true)
        setrank(value)
    }

    if( effect_id == undefined){
        return (
            ""
        )
    } else{
        return (
            <div>
                {effect_id && effect_id.cond_id ? 
                    <div>
                    {replacer("\xa0┬ " + effect_id.cond_id.toString())}
                    </div>
                : ""}
                {effect_id && effect_id.effectstr ? 
                <div className={`${currentlevel <= 0 && effect_id.slidertype == "levels" ? "inactiveeffect" : ""}`}>
                {replacer(
                    `\xa0${effect_id.cond_id != undefined ? "└─" : "-"} ` + 
                effect_id.effectstr.replace(/\[value1\]/gm,displayrank && displayrank.value1).replace(/\[value2\]/gm,rank && rank.value2 ).replace(/\[value3\]/gm,rank && rank.value3).replace(/\[value4\]/gm,rank && rank.value4 ).replace(/\[value5\]/gm,rank && rank.value5 ).replace(/\[BRV_CAP\]/gm, brv_cap.toLocaleString("en-US")).replace(/\[MAX_CAP\]/gm, max_brv_cap.toLocaleString("en-US"))
                )}
                </div>
                :""}
                {effect_id && effect_id.stack_flag != undefined ?
                    <div className="typeval">
                        {replacer(effect_id.stack_flag)}
                    </div>
                :""}
                {effect_id && effect_id.ValTypeShow == false ? "" :
                effect_id && effect_id.val_typestr != undefined ?
                <div className="typeval">
                    {replacer(effect_id.val_typestr)}
                    </div>
                :""}
                {effect_id.EffectValueTypeShow == false ? "" :
                effect_id && effect_id.effect_value_typestr == undefined ? "" :
                    <div className="typeval">
                        {replacer(effect_id.effect_value_typestr)}
                    </div>
                }
                {effect_id.ValEditTypeShow == false ? "" :
                effect_id && effect_id.val_edit_typestr == undefined ? "" :
                <div className="typeval">
                    {replacer(
                        effect_id.val_edit_typestr.replace(/\[value1\]/gm,rank && rank.value1 ).replace(/\[value2\]/gm,rank &&  rank.value2 ).replace(/\[value3\]/gm,rank && rank.value3 ).replace(/\[value4\]/gm,rank && rank.value4 ).replace(/\[value5\]/gm,rank && rank.value5).replace(/\[BRV_CAP\]/gm, brv_cap.toLocaleString("en-US")).replace(/\[MAX_CAP\]/gm, max_brv_cap.toLocaleString("en-US"))
                        )}
                </div>
                }
            </div>
        )
         
    }
}

export default Ailment_Data_Pars_Field_Handler