import React from "react";
import Slider from 'react-input-slider';

export default function AilmentSliderFormatting({
    ailment_data,
    sliders,
    highestlvl,
    nobuffpadding,

    currentlevel,
    handleChangeLevel,

    currentturns,
    handleChangeTurns,

    currentdebuffsranks,
    handleChangeDebuffRank,

    currentdebuffsranks2,
    handleChangeDebuffRank2,

    currentdebuffsmuliply,
    handleChangeDebuffMuliply,

    currentfieldbuffsranks,
    handleChangeFieldBuffRank,

    currentbuffsranks,
    handleChangeBuffRank,

    currentbuffsmuliply,
    handleChangeBuffMuliply,

    currentbuffsmuliplysolo,
    handleChangeBuffMuliplySolo,

    currentenemies,
    handleChangeEnemies,

    currentstacks,
    handleChangeStacks,

    currentgroupstacks,
    handleChangeGroupStacks,

    currenthp,
    handleChangeHP,

    charactersleft,
    handleChangeCharactersLeft,

    characterskb,
    handleChangeCharactersKB,

    currentweaknessmuliply,
    handleChangeWeaknessMuliply
}){

    if(ailment_data && ailment_data.is_state == true || sliders && Object.keys(sliders).length == 0){
        return ""
    }
    if( sliders.levels == false &&
        sliders.turns == false &&
        sliders.debuffsrank == false &&
        sliders.debuffsrank2 == false &&
        sliders.debuffsmuliply == false &&
        sliders.fieldbuffsrank == false &&
        sliders.buffsrank == false &&
        sliders.buffsmuliply == false &&
        sliders.buffsmuliplysolo == false &&
        sliders.groupstacks == false &&
        sliders.enemies == false &&
        sliders.stacks == false &&
        sliders.currenthp == false &&
        sliders.charactersleft == false &&
        sliders.characterskb == false &&
        sliders.weaknessmuliply == false
        ){
        return ""
    }

    const SilderStyle = `{
        "track": {
            "marginLeft": "5px",
            "backgroundColor": "#bec037",
            "boxShadow": "1px 1px 1px #000000, 0px 0px 1px #0d0d0d"
        },
        "active": {
            "backgroundColor": "#a7a930",
            "boxShadow": "1px 1px 1px #000000, 0px 0px 1px #0d0d0d"
        },
        "thumb": {
            "borderRadius": "3px",
            "border": "1px solid #000000",
            "boxShadow": "1px 1px 1px #000000, 0px 0px 1px #0d0d0d",
            "width": 12,
            "height": 25,
            "&:hover": {
                "background": "#efefef"
            }
        }
    }`

    var SilderStyleTurns = JSON.parse(SilderStyle)
    SilderStyleTurns.track.backgroundColor = '#dcc419'
    SilderStyleTurns.active.backgroundColor = '#c5a326'

    var SilderStyleDebuff = JSON.parse(SilderStyle)
    SilderStyleDebuff.track.backgroundColor = '#a93030'
    SilderStyleDebuff.active.backgroundColor = '#c03737'

    var SilderStyleBuff = JSON.parse(SilderStyle)
    SilderStyleBuff.track.backgroundColor = '#34a930'
    SilderStyleBuff.active.backgroundColor = '#4ec037'

    var SilderStyleHP = JSON.parse(SilderStyle)
    SilderStyleHP.track.backgroundColor = '#a93030'
    SilderStyleHP.active.backgroundColor = '#c03737'

    var SilderStyleLevel = JSON.parse(SilderStyle)
    SilderStyleLevel.track.backgroundColor = '#367ebd'
    SilderStyleLevel.active.backgroundColor = '#3071a9'


    return (
        <div className={`sliderbase infonameholderenemybuff ${nobuffpadding == true ? "nobuffpadding":""}`}>
            {sliders.levels == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Level: ${currentlevel} / ${highestlvl}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleLevel}
                        onChange={handleChangeLevel}
                        x={currentlevel}
                        xmin={0}
                        xmax={highestlvl}
                    />
                </div>
                : ""}
            {sliders.turns == true ?
                <div
                    className="sliderspacer">
                    <div className="rankspacer">{`Turns remaining: ${currentturns} / ${10}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleTurns}
                        onChange={handleChangeTurns}
                        x={currentturns}
                        xmin={1}
                        xmax={10}
                    />
                </div>
                : ""}
            {sliders.debuffsrank == true ?
                <div
                    className="sliderspacer">
                    <div className="rankspacer">{`Debuffs: ${currentdebuffsranks - 1} / ${8}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleDebuff}
                        onChange={handleChangeDebuffRank}
                        x={currentdebuffsranks}
                        xmin={1}
                        xmax={9}
                    />
                </div>
                : ""}
            {sliders.debuffsrank2 == true ?
                <div
                    className="sliderspacer">
                    <div className="rankspacer">{`Debuffs: ${currentdebuffsranks2} / ${8}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleDebuff}
                        onChange={handleChangeDebuffRank2}
                        x={currentdebuffsranks2}
                        xmin={0}
                        xmax={8}
                    />
                </div>
                : ""}
            {sliders.debuffsmuliply == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Debuffs: ${currentdebuffsmuliply - 1} / ${8}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleDebuff}
                        onChange={handleChangeDebuffMuliply}
                        x={currentdebuffsmuliply}
                        xmin={1}
                        xmax={9}
                    />
                </div>
                : ""}
            {sliders.weaknessmuliply == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Weakness: ${currentweaknessmuliply - 1} / ${8}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleDebuff}
                        onChange={handleChangeWeaknessMuliply}
                        x={currentweaknessmuliply}
                        xmin={1}
                        xmax={9}
                    />
                </div>
                : ""}
            {sliders.fieldbuffsrank == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Per 3 Party Buffs: ${currentfieldbuffsranks - 1} / ${6}`}</div>
                    <Slider
                        styles={SilderStyleBuff}
                        onChange={handleChangeFieldBuffRank}
                        x={currentfieldbuffsranks}
                        xmin={1}
                        xmax={7}
                    />
                </div>
                : ""}
            {sliders.buffsrank == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Party Buffs: ${currentbuffsranks - 1} / ${18}`}</div>
                    <Slider
                        styles={SilderStyleBuff}
                        onChange={handleChangeBuffRank}
                        x={currentbuffsranks}
                        xmin={1}
                        xmax={19}
                    />
                </div>
                : ""}
            {sliders.buffsmuliply == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Party Buffs: ${currentbuffsmuliply - 1} / ${18}`}</div>
                    <Slider
                        styles={SilderStyleBuff}
                        onChange={handleChangeBuffMuliply}
                        x={currentbuffsmuliply}
                        xmin={1}
                        xmax={19}
                    />
                </div>
                : ""}
            {sliders.buffsmuliplysolo == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Attacker's Buffs: ${currentbuffsmuliplysolo - 1} / ${6}`}</div>
                    <Slider
                        styles={SilderStyleBuff}
                        onChange={handleChangeBuffMuliplySolo}
                        x={currentbuffsmuliplysolo}
                        xmin={1}
                        xmax={7}
                    />
                </div>
                : ""}
            {sliders.enemies == true ?
                <div
                    className="sliderspacer">
                    <div className="rankspacer">{`Enemies: ${currentenemies} / ${3}`}</div>
                    <Slider
                        styles={SilderStyleBuff}
                        onChange={handleChangeEnemies}
                        x={currentenemies}
                        xmin={1}
                        xmax={3}
                    />
                </div>
                : ""}
            {sliders.stacks == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Levels: ${currentstacks} / ${5}`}</div>
                    <Slider
                        styles={SilderStyleDebuff}
                        onChange={handleChangeStacks}
                        x={currentstacks}
                        xmin={1}
                        xmax={5}
                    />
                </div>
                : ""}
            {sliders.groupstacks == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Levels: ${currentgroupstacks} / ${5}`}</div>
                    <Slider
                        styles={SilderStyleDebuff}
                        onChange={handleChangeGroupStacks}
                        x={currentgroupstacks}
                        xmin={1}
                        xmax={5}
                    />
                </div>
                : ""}
            {sliders.currenthp == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Current HP: ${currenthp}% of ${100}%`}</div>
                    <Slider

                        axis="x"
                        styles={SilderStyleHP}
                        onChange={handleChangeHP}
                        x={currenthp}
                        xmin={0}
                        xmax={100}
                    />
                </div>
                : ""}
            {sliders.charactersleft == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Characters to left: ${charactersleft} of ${2}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleHP}
                        onChange={handleChangeCharactersLeft}
                        x={charactersleft}
                        xmin={0}
                        xmax={2}
                    />
                </div>
                : ""}
            {sliders.characterskb == true ?
                <div className="sliderspacer">
                    <div className="rankspacer">{`Characters in Knock Back: ${characterskb} of ${3}`}</div>
                    <Slider
                        axis="x"
                        styles={SilderStyleBuff}
                        onChange={handleChangeCharactersKB}
                        x={characterskb}
                        xmin={0}
                        xmax={3}
                    />
                </div>
                : ""}
        </div>
    )
}