import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import DefaultTippy from '../../../formatting/TippyDefaults';
import Format_Cleaner from '../../../processing/Format_Cleaner'
import { useDispatch, useSelector } from "react-redux";
import ReactJson from '@microlink/react-json-view'
import { getTransNames } from '../../../redux/ducks/transnames';
import translater from '../../../processing/translater_characters';
import Slider_Handler from './Slider_Handler';
import Slider from 'react-input-slider';
import SilderStyleLevel from './SilderStyleLevel';
import SilderStyleTurns from './SilderStyleTurns';
import SilderStyleDebuff from './SilderStyleDebuff';
import SilderStyleHP from './SilderStyleHP';
import SilderStyleBuff from './SilderStyleBuff';
import Ailment_Meta_Handler from './Ailment_Meta_Handler.js'
import replacer_titles from '../../../processing/replacer_titles'
import addformatting from '../../../processing/replacer_buffcontent'
import DevSwitch from '../../../redux/DevSwitch';
import Ailment_Dif from './Ailment_Dif';
const Diff = require('diff');

const Ailment_Character_Dif = ({
    buff_new,
    ver_new,
    buff_old,
    ver_old,
    master_index,
}) => {

    const castlocation = true

    const makediff = (oldText, newText) => {
        const JPDESCREPLACE = Diff.diffTrimmedLines(oldText + "\n", newText + "\n", { newlineIsToken: false })
        const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~' : ""}${text.removed == true ? '^^' + text.value + '^.^' : ""}${text.removed == undefined && text.added == undefined ? text.value : ""}`).join("")
        return (
            output
        )
    }

    const [onion_passoff, setonion_passoff] = useStateIfMounted();
    const [showdesc, setshowdesc] = useStateIfMounted(false);
    const [setdesc, setsetdesc] = useStateIfMounted();
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    useEffect(() => {
        setshowdesc(false)
        setsetdesc()
    }, [buff_new, setsetdesc, setshowdesc])

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

    async function doTrans(text) {
        setshowtrans((prevValue) => !prevValue)
    }

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined && showtrans == true) {
            dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, transnames, showtrans]);

    useEffect(() => {
        const text = Format_Cleaner(setdesc).replace(/\\n/gm, "\x0A")
        if (transnames != undefined && showtrans == true) {
            const translate = translater(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, setdesc]);

    const showmedesc = (current) => {
        if (current == false) {
            setshowdesc(true)
        } else {
            setshowdesc(false)
            setonion_passoff()
        }
    }

    useEffect(() => {
        if (buff_new && buff_new.id && showdesc == true) {
            if (onion_passoff != undefined) {
                if (DevSwitch == true) {
                    axios.get(`http://localhost:3005/data/_dir/ailmenttextonion/${onion_passoff}`, { 'muteHttpExceptions': true }).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver_new])
                    }).catch(function (err) {
                        console.log(err)
                        setsetdesc("")
                    })
                } else {
                    axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttextonion/${onion_passoff}.json`, { 'muteHttpExceptions': true }).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver_new])
                    }).catch(function (err) {
                        console.log(err)
                        setsetdesc("")
                    })
                }
            } else {
                if (buff_new.onion == undefined) {
                    if (DevSwitch == true) {
                        axios.get(`http://localhost:3005/data/_dir/ailmenttext/${buff_new.id}`, { 'muteHttpExceptions': true }).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver_new])
                        }).catch(function (err) {
                            console.log(err)
                            setsetdesc("")
                        })
                    } else {
                        axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttext/${buff_new.id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver_new])
                        }).catch(function (err) {
                            console.log(err)
                            setsetdesc("")
                        })
                    }
                }
            }
        }
        // eslint-disable-next-line 
    }, [showdesc, onion_passoff, buff_new, ver_new])

    const [highestlvl, setHighestlvl] = useStateIfMounted();
    const [highestlvl_old, setHighestlvl_old] = useStateIfMounted();

    useEffect(() => {
        if (buff_new.max_level >= 10) {
            setHighestlvl(10)
        }
        if (buff_new.max_level <= 10 && buff_new.max_level != 0) {
            setHighestlvl(buff_new.max_level)
        }
        if (buff_new.max_level == 0) {
            setHighestlvl(0)
        }
        if (buff_new.max_level_overide != undefined) {
            setHighestlvl(buff_new.max_level_overide)
        }

        if (buff_new.max_level == -1 && buff_new.aarg1 != undefined) {
            setHighestlvl(buff_new.aarg1)
        }
        // eslint-disable-next-line
    }, [buff_new])

    useEffect(() => {
        if (buff_old.max_level >= 10) {
            setHighestlvl_old(10)
        }
        if (buff_old.max_level <= 10 && buff_old.max_level != 0) {
            setHighestlvl_old(buff_old.max_level)
        }
        if (buff_old.max_level == 0) {
            setHighestlvl_old(0)
        }
        if (buff_old.max_level_overide != undefined) {
            setHighestlvl_old(buff_old.max_level_overide)
        }

        if (buff_old.max_level == -1 && buff_old.aarg1 != undefined) {
            setHighestlvl_old(buff_old.aarg1)
        }
        // eslint-disable-next-line
    }, [buff_old])

    const [currentlevel, setcurrentlevel] = useStateIfMounted(buff_new.aarg1)

    useEffect(() => {
        if (buff_new && buff_new.onion != undefined && buff_new.onion != -1 && showdesc == true) {
            setonion_passoff(buff_new.onion + (currentlevel < 1 ? 0 : currentlevel - 1))
        }
    }, [currentlevel, setonion_passoff, buff_new, showdesc])

    var turns_set = buff_new.alife

    const [currentturns, setcurrentturns] = useStateIfMounted(turns_set == undefined ? 1 : turns_set < 1 ? 1 : turns_set)
    const [currentdebuffsranks, setcurrentdebuffsranks] = useStateIfMounted(9)
    const [currentdebuffsmuliply, setcurrentdebuffsmuliply] = useStateIfMounted(9)
    const [currentbuffsranks, setcurrentbuffsranks] = useStateIfMounted(19)
    const [currentfieldbuffsranks, setcurrentfieldbuffsranks] = useStateIfMounted(7)
    const [currentbuffsmuliply, setcurrentbuffsmuliply] = useStateIfMounted(19)
    const [currentstacks, setcurrentstacks] = useStateIfMounted(5)
    const [currentenemies, setcurrentenemies] = useStateIfMounted(3)
    const [currentgroupstacks, setcurrentgroupstacks] = useStateIfMounted(5)
    const [currenthp, setcurrenthp] = useStateIfMounted(100)
    const [charactersleft, setcharactersleft] = useStateIfMounted(2)

    const handleChangeLevel = (e) => {
        setcurrentlevel(parseInt(e.x));
    };

    const handleChangeDebuffRank = (e) => {
        setcurrentdebuffsranks(parseInt(e.x));
    };
    const handleChangeDebuffMuliply = (e) => {
        setcurrentdebuffsmuliply(parseInt(e.x));
    };

    const handleChangeBuffRank = (e) => {
        setcurrentbuffsranks(parseInt(e.x));
    };
    const handleChangeFieldBuffRank = (e) => {
        setcurrentfieldbuffsranks(parseInt(e.x));
    };
    const handleChangeBuffMuliply = (e) => {
        setcurrentbuffsmuliply(parseInt(e.x));
    };

    const handleChangeGroupStacks = (e) => {
        setcurrentgroupstacks(parseInt(e.x));
    };

    const handleChangeStacks = (e) => {
        setcurrentstacks(parseInt(e.x));
    };

    const handleChangeEnemies = (e) => {
        setcurrentenemies(parseInt(e.x));
    };
    const handleChangeTurns = (e) => {
        setcurrentturns(parseInt(e.x));
    };

    const handleChangeHP = (e) => {
        setcurrenthp(parseInt(e.x));
    };

    const handleChangeCharactersLeft = (e) => {
        setcharactersleft(parseInt(e.x));
    };

    const metadata = Ailment_Meta_Handler(
        buff_new.icon_type,
        buff_new.sp_disp_type,
        buff_new.global_limit,
        buff_new.life_type,
        buff_new.extendable,
        buff_new.onion,
        buff_new.b_life,
        buff_new.b_active,
        buff_new.max_level,
        buff_new.life_max_,
        buff_new.group_id,

        master_index,
        highestlvl
    )

    const metadata_old = Ailment_Meta_Handler(
        buff_old.icon_type,
        buff_old.sp_disp_type,
        buff_old.global_limit,
        buff_old.life_type,
        buff_old.extendable,
        buff_old.onion,
        buff_old.b_life,
        buff_old.b_active,
        buff_old.max_level,
        buff_old.life_max_,
        buff_old.group_id,

        master_index,
        highestlvl_old
    )

    const effect_value_type_field = buff_new.field && buff_new.field.map(self => {
        const fieldpull = self.effect_id && self.effect_id.effect_value_type
        return fieldpull
    })

    const val_edit_type_field = buff_new.field && buff_new.field.map(self => {
        const fieldpull = self.effect_id && self.effect_id.val_edit_type
        return fieldpull
    })

    const sliders = Slider_Handler(buff_new && buff_new.val_type,
        buff_new && buff_new.val_type_1,
        buff_new && buff_new.val_type_2,
        buff_new && buff_new.val_type_3,
        buff_new && buff_new.val_type_4,
        buff_new && buff_new.val_type_5,
        buff_new && buff_new.val_type_6,
        buff_new && buff_new.val_type_7,
        buff_new && buff_new.val_type_8,
        buff_new && buff_new.val_type_9,
        buff_new && buff_new.val_edit_type,
        buff_new && buff_new.val_edit_type_1,
        buff_new && buff_new.val_edit_type_2,
        buff_new && buff_new.val_edit_type_3,
        buff_new && buff_new.val_edit_type_4,
        buff_new && buff_new.val_edit_type_5,
        buff_new && buff_new.val_edit_type_6,
        buff_new && buff_new.val_edit_type_7,
        buff_new && buff_new.val_edit_type_8,
        buff_new && buff_new.val_edit_type_9,
        buff_new.max_level_overide != undefined ? buff_new.max_level_overide : buff_new.max_level,
        effect_value_type_field,
        val_edit_type_field);

    const ailmentname = buff_new.name && buff_new.name

    const ailmentjpname = buff_new.jpname && buff_new.jpname

    const [options_tex, setoptions_tex] = useStateIfMounted("");
    const [options_tex_old, setoptions_tex_old] = useStateIfMounted("");

    useEffect(() => {
        if (buff_new.options != undefined) {
            var options_str = ""
            buff_new.options.forEach(self => {
                options_str = `${options_str} - ${self}\n`
            })
            setoptions_tex(options_str)
        }
        if (buff_old.options != undefined) {
            var options_old_str = ""
            buff_old.options.forEach(self => {
                options_old_str = `${options_old_str} - ${self}\n`
            })
            setoptions_tex_old(options_old_str)
        }
    }, [buff_new, buff_old, setoptions_tex, setoptions_tex_old])



    return (
        <div className={`${castlocation == false ? "buffunit" : ""}`}>
            <div className={`${"bufflistbanner "}${buff_new.is_buff == 0 ? "Debuffbase" : "Buffbase"}`}
            >
                <LazyLoadComponent>
                    {castlocation == false ?
                        <>
                            <div className="infotitleholderenemybuff">
                                <img onClick={showmeraw} className="bufficonenemy" alt={buff_new.name && buff_new.name} src={"https://dissidiacompendium.com/images/static/" + buff_new.icon} />
                            </div>
                            <div className={buff_new.is_buff == 0 ? "Debuffbanner infonameholderenemybuff" : "Buffbanner infonameholderenemybuff"}>
                                <div className="infotitle">
                                    {replacer_titles(`${ailmentname == "" ? `Unknown ${buff_new.is_buff == 1 ? "buff" : "debuff"}` : ailmentname}` + " - #" + buff_new.id)}
                                    {ailmentjpname == "" || ailmentjpname == undefined ?
                                        <div className="abilityJPname">
                                            {"None テキストなし"}
                                        </div>
                                        : <div className="abilityJPname">
                                            {replacer_titles(ailmentjpname)}
                                        </div>}
                                </div>
                            </div>
                        </>
                        :
                        <div onClick={showmeraw} className={buff_new.is_buff == 1 ? "Buffsubbanner" : "Debuffsubbanner"}>
                            {replacer_titles(ailmentname + " - #" + buff_new.id)}
                            {ailmentjpname == "" || ailmentjpname == undefined ?
                                <div className="abilityJPname">
                                    {"None テキストなし"}
                                </div>
                                : <div className="abilityJPname">
                                    {replacer_titles(ailmentjpname)}
                                </div>}
                        </div>
                    }
                    {sliders.levels == false &&
                        sliders.turns == false &&
                        sliders.debuffsrank == false &&
                        sliders.debuffsmuliply == false &&
                        sliders.fieldbuffsrank == false &&
                        sliders.buffsrank == false &&
                        sliders.buffsmuliply == false &&
                        sliders.groupstacks == false &&
                        sliders.enemies == false &&
                        sliders.stacks == false &&
                        sliders.currenthp == false &&
                        sliders.charactersleft == false
                        ?
                        "" :
                        <div className={`sliderbase infonameholderenemybuff `}>
                            {sliders.levels == true ?
                                <div className="sliderspacer">
                                    <div className="rankspacer">{`Level: ${currentlevel} / ${highestlvl}`}</div>
                                    <Slider
                                        key={buff_new}
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
                                        key={buff_new}
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
                                        key={buff_new}
                                        axis="x"
                                        styles={SilderStyleDebuff}
                                        onChange={handleChangeDebuffRank}
                                        x={currentdebuffsranks}
                                        xmin={1}
                                        xmax={9}
                                    />
                                </div>
                                : ""}
                            {sliders.debuffsmuliply == true ?
                                <div className="sliderspacer">
                                    <div className="rankspacer">{`Debuffs: ${currentdebuffsmuliply - 1} / ${8}`}</div>
                                    <Slider
                                        key={buff_new}
                                        axis="x"
                                        styles={SilderStyleDebuff}
                                        onChange={handleChangeDebuffMuliply}
                                        x={currentdebuffsmuliply}
                                        xmin={1}
                                        xmax={9}
                                    />
                                </div>
                                : ""}
                            {sliders.fieldbuffsrank == true ?
                                <div className="sliderspacer">
                                    <div className="rankspacer">{`Per 3 Party Buffs: ${currentfieldbuffsranks - 1} / ${6}`}</div>
                                    <Slider
                                        key={buff_new}
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
                                        key={buff_new}
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
                                        key={buff_new}
                                        styles={SilderStyleBuff}
                                        onChange={handleChangeBuffMuliply}
                                        x={currentbuffsmuliply}
                                        xmin={1}
                                        xmax={19}
                                    />
                                </div>
                                : ""}
                            {sliders.enemies == true ?
                                <div
                                    className="sliderspacer">
                                    <div className="rankspacer">{`Enemies: ${currentenemies} / ${3}`}</div>
                                    <Slider
                                        key={buff_new}
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
                                        key={buff_new}
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
                                        key={buff_new}
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
                                        key={buff_new}
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
                                        key={buff_new}
                                        axis="x"
                                        styles={SilderStyleHP}
                                        onChange={handleChangeCharactersLeft}
                                        x={charactersleft}
                                        xmin={0}
                                        xmax={2}
                                    />
                                </div>
                                : ""}
                        </div>}
                    <div>
                        <Ailment_Dif
                            master_index={master_index}
                            ver_old={ver_old}
                            buff_old={buff_old}
                            ver_new={ver_new}
                            buff_new={buff_new}
                            currentturns_passoff={currentturns}
                            currentdebuffsranks_passoff={currentdebuffsranks}
                            currentdebuffsmuliply_passoff={currentdebuffsmuliply}
                            currentbuffsranks_passoff={currentbuffsranks}
                            currentfieldbuffsranks_passoff={currentfieldbuffsranks}
                            currentbuffsmuliply_passoff={currentbuffsmuliply}
                            currentstacks_passoff={currentstacks}
                            currentenemies_passoff={currentenemies}
                            currentgroupstacks_passoff={currentgroupstacks}
                            currenthp_passoff={currenthp}
                            charactersleft_passoff={charactersleft}
                            currentlevel_passoff={currentlevel}
                        />
                        {buff_new.options != undefined ?
                            <div className='p_grade'>
                                <div className='fieldbar'>
                                    <div >
                                        <span className='mini_ability'></span>Upgrades:
                                    </div>
                                </div>
                                {addformatting(makediff(Format_Cleaner(options_tex_old).replace(/\s+$/g, ""), Format_Cleaner(options_tex).replace(/\s+$/g, "")))}
                                <div className='abilityJPname'>*conditions may apply</div>
                            </div>
                            : ""}

                        {metadata && addformatting(makediff(Format_Cleaner(metadata_old).replace(/^\s+|\s+$/g, ""), Format_Cleaner(metadata).replace(/^\s+|\s+$/g, "")))}

                        <div onClick={() => showmedesc(showdesc)} className='clicky updatelink'>{showdesc == false ? "\xa0- Show Desc -" : "\xa0- Hide Desc -"}</div>
                        {showdesc == true ?
                            <hr></hr>
                            : ""}
                        {showdesc == true && trans != undefined && showtrans == true ?
                            trans.split(/\n/gm).map((value, i) =>
                                <div key={i}>
                                    {replacer_titles(value)}<br></br>
                                </div>
                            )
                            :
                            <div>
                                {showdesc == true && setdesc != undefined && showtrans != true ? replacer_titles(Format_Cleaner(setdesc == undefined || setdesc == "" ? "Not available" : setdesc)) : ""}
                            </div>
                        }
                        {ver_new == "JP" && showdesc == true ?
                            <div className='clicky updatelink contents' onClick={() => doTrans()}>Translate (Beta)</div>
                            : ""}

                        {showraw == true ?
                            <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={buff_new} />
                            : ""}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}
export default Ailment_Character_Dif