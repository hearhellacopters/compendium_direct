import React, {useState, useEffect} from 'react';
import Ailment_Data_Pars_Handler from './Ailment_Data_Pars_Handler';
import DefaultTippy from  '../TippyDefaults'
import { useStateIfMounted } from 'use-state-if-mounted';
import Ailment_Level_Settings from './Ailment_Level_Settings';
import Ailment_Data_Pars_Field_Handler from './Ailment_Data_Pars_Field_Handler';
import Slider from 'react-input-slider';
import SilderStyleLevel from './SilderStyleLevel';
import SilderStyleTurns from './SilderStyleTurns';
import SilderStyleDebuff from './SilderStyleDebuff';
import SilderStyleHP from './SilderStyleHP';
import SilderStyleBuff from './SilderStyleBuff';
import Ailment_Data_Combination_Formatting from './Ailment_Combination_Formatting'
import Ailment_Modify_Formatting from './Ailment_Modify_Formatting';
import Ailment_Attached from './Ailment_Attached';
import replacer_buff from '../../processing/replacer_buffcontent'
import ReactJson from '@microlink/react-json-view'

const Ailment_Data_Formatting = ({
    ailment_data,
    turns
}) =>{

    const [showattached, setshowattached] = useState(false);

    const showmeattached = (current)=>{
        if(current == false){
            setshowattached(true)
        } else{
            setshowattached(false)
        }
    }

    const slider = true

    const castlocation = true

    const arg1 = ailment_data.arg1

    const arg2 = ailment_data.arg2

    const rank = ailment_data.rank

    const [highestlvl, setHighestlvl] = useState();

    useEffect(()=>{
        if(ailment_data.max_level >= 10){
            setHighestlvl(10)
        }
        if(ailment_data.max_level <= 10 && ailment_data.max_level != 0){
            setHighestlvl(ailment_data.max_level)
        } 
        if(ailment_data.max_level == 0){
            setHighestlvl(0)
        }
        if(ailment_data.max_level_overide != undefined){
            setHighestlvl(ailment_data.max_level_overide)
        }

        if(ailment_data.max_level == -1 && arg2 != undefined){
            setHighestlvl(arg2)
        }
        if(ailment_data.max_level == -1 && arg2 == undefined){
            setHighestlvl(10)
        }
    },[ailment_data, arg2])

    const [currentrank, setcurrentrank] = useState(castlocation == false ? 1 : rank)
    const [currentlevel, setcurrentlevel] = useState(castlocation == false ? 1 : arg1)

    useEffect(()=>{
        if(arg1 != undefined && highestlvl != 0){
            if(castlocation == true){
                setcurrentlevel(arg1)
            }
        }
    },[highestlvl, ailment_data,arg1,castlocation])

    var turns_set = ailment_data && ailment_data.alife != undefined ? ailment_data.alife : turns

    const [currentturns, setcurrentturns] = useStateIfMounted(turns_set == undefined ? 1 : turns_set < 1 ? 1 : turns_set)
    const [currentdebuffsranks, setcurrentdebuffsranks] = useStateIfMounted(9)
    const [currentdebuffsmuliply, setcurrentdebuffsmuliply] = useStateIfMounted(9)
    const [currentbuffsranks, setcurrentbuffsranks] = useStateIfMounted(19)
    const [currentfieldbuffsranks, setcurrentfieldbuffsranks] = useStateIfMounted(7)
    const [currentbuffsmuliply, setcurrentbuffsmuliply] = useStateIfMounted(19)
    const [currentstacks, setcurrentstacks] = useStateIfMounted(5)
    const [currentenemies, setcurrentenemies] = useStateIfMounted(3)
    const [currentgroupstacks, setcurrentgroupstacks] = useStateIfMounted(5)
    const [currenthp, setcurrenthp] = useState(100)
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

    const handleChangeRank = (e) => {
        setcurrentrank(parseInt(e.x));
      };

    const handleChangeHP = (e) => {
    setcurrenthp(parseInt(e.x));
    };

    const handleChangeCharactersLeft = (e) => {
        setcharactersleft(parseInt(e.x));
        };

    const sliders = ailment_data.sliders

    const effect_id_0 = ailment_data.effect_id_0

    const effect_id_1 = ailment_data.effect_id_1

    const effect_id_2 = ailment_data.effect_id_2

    const effect_id_3 = ailment_data.effect_id_3

    const effect_id_4 = ailment_data.effect_id_4 && ailment_data.effect_id_4.effectstr == "Field Effects" ? undefined : ailment_data.effect_id_4

    const effect_id_5 = ailment_data.effect_id_5

    const effect_id_6 = ailment_data.effect_id_6

    const effect_id_7 = ailment_data.effect_id_7
        
    const effect_id_8 = ailment_data.effect_id_8

    const effect_id_9 = ailment_data.effect_id_9

    const metadata = ailment_data.metadata

    const [attachedbuff,setattachedbuff] = useStateIfMounted([])

    const buffattachedselect = (e) =>{
        if(attachedbuff && attachedbuff.id == e.id ){
            setattachedbuff([])
        } else {
            setattachedbuff(e)
        }
    }

    return (
            <div>
                {sliders.levels == undefined && 
                sliders.turns == undefined && 
                sliders.debuffsrank == undefined &&
                sliders.debuffsmuliply == undefined &&
                sliders.fieldbuffsrank == undefined &&
                sliders.buffsrank == undefined &&
                sliders.buffsmuliply == undefined &&
                sliders.groupstacks == undefined &&
                sliders.enemies == undefined &&
                sliders.stacks == undefined &&
                sliders.currenthp == undefined &&
                sliders. charactersleft == undefined 
                ?
                "" :
                <div className={`sliderbase infonameholderenemybuff `}>
                    {sliders.levels == true ?
                    <div  className="sliderspacer">
                    <div className="rankspacer">{`Level: ${currentlevel} / ${highestlvl}`}</div>
                    <Slider 
                    key={ailment_data}
                    axis="x"
                    styles={SilderStyleLevel}
                    onChange={handleChangeLevel}
                    x={currentlevel} 
                    xmin={0} 
                    xmax={highestlvl} 
                    />
                    </div>
                    :""}
                    {sliders.turns == true ?
                    <div 
                    key={ailment_data.unq_id}
                    className="sliderspacer">
                    <div className="rankspacer">{`Turns remaining: ${currentturns} / ${10}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    axis="x"
                    styles={SilderStyleTurns}
                    onChange={handleChangeTurns}
                    x={currentturns} 
                    xmin={1} 
                    xmax={10}
                    />
                    </div>
                    :""}
                    {sliders.debuffsrank == true ?
                    <div 
                    key={ailment_data.unq_id}
                    className="sliderspacer">
                    <div className="rankspacer">{`Debuffs: ${currentdebuffsranks - 1} / ${8}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    axis="x"
                    styles={SilderStyleDebuff}
                    onChange={handleChangeDebuffRank}
                    x={currentdebuffsranks} 
                    xmin={1} 
                    xmax={9}
                    />
                    </div>
                    :""}
                    {sliders.debuffsmuliply == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Debuffs: ${currentdebuffsmuliply - 1} / ${8}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    axis="x"
                    styles={SilderStyleDebuff}
                    onChange={handleChangeDebuffMuliply}
                    x={currentdebuffsmuliply} 
                    xmin={1} 
                    xmax={9}
                    />
                    </div>
                    :""}
                    {sliders.fieldbuffsrank == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Per 3 Party Buffs: ${currentfieldbuffsranks - 1} / ${6}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    styles={SilderStyleBuff}
                    onChange={handleChangeFieldBuffRank}
                    x={currentfieldbuffsranks} 
                    xmin={1} 
                    xmax={7}
                    />
                    </div>
                    :""}
                    {sliders.buffsrank == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Party Buffs: ${currentbuffsranks - 1} / ${18}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    styles={SilderStyleBuff}
                    onChange={handleChangeBuffRank}
                    x={currentbuffsranks} 
                    xmin={1} 
                    xmax={19}
                    />
                    </div>
                    :""}
                    {sliders.buffsmuliply == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Party Buffs: ${currentbuffsmuliply - 1} / ${18}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    styles={SilderStyleBuff}
                    onChange={handleChangeBuffMuliply}
                    x={currentbuffsmuliply} 
                    xmin={1} 
                    xmax={19}
                    />
                    </div>
                    :""}
                    {sliders.enemies == true ?
                    <div 
                    key={ailment_data.unq_id}
                    className="sliderspacer">
                    <div className="rankspacer">{`Enemies: ${currentenemies} / ${3}`}</div>
                    <Slider 
                    key={ailment_data}
                    styles={SilderStyleBuff}
                    onChange={handleChangeEnemies}
                    x={currentenemies} 
                    xmin={1} 
                    xmax={3}
                    />
                    </div>
                    :""}
                    {sliders.stacks == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Levels: ${currentstacks} / ${5}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    styles={SilderStyleDebuff}
                    onChange={handleChangeStacks}
                    x={currentstacks}  
                    xmin={1} 
                    xmax={5}
                    />
                    </div>
                    :""}
                    {sliders.groupstacks == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Levels: ${currentgroupstacks} / ${5}`}</div>
                    <Slider 
                    key={ailment_data.unq_id}
                    styles={SilderStyleDebuff}
                    onChange={handleChangeGroupStacks}
                    x={currentgroupstacks} 
                    xmin={1} 
                    xmax={5}
                    />
                    </div>
                    :""}
                    {sliders.currenthp == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Current HP: ${currenthp}% of ${100}%`}</div>
                    <Slider 
                    key={ailment_data}
                    axis="x"
                    styles={SilderStyleHP}
                    onChange={handleChangeHP}
                    x={currenthp} 
                    xmin={0} 
                    xmax={100}
                    />
                    </div>
                    :""}
                    {sliders.charactersleft == true ?
                    <div className="sliderspacer">
                    <div className="rankspacer">{`Characters to left: ${charactersleft} of ${2}`}</div>
                    <Slider 
                    key={ailment_data}
                    axis="x"
                    styles={SilderStyleHP}
                    onChange={handleChangeCharactersLeft}
                    x={charactersleft} 
                    xmin={0} 
                    xmax={2}
                    />
                    </div>
                    :""}
                    </div>}
                    <div >
                        {ailment_data.note!=undefined?
                        <div className="subpassiveflair">
                        {ailment_data.note.split(/\n/gm).map((value, i)=>
                        <div key={i}>{replacer_buff(`(${value})`)}</div>
                        )}
                        </div>
                        :""}
                        {ailment_data.components != undefined ?
                            <div className="subpassiveflair2">
                            {ailment_data.components.map((item, i)=>
                                <Ailment_Data_Combination_Formatting
                                key={i}
                                components={item}
                                />
                            )}
                        </div>
                        :""}
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_0}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_1}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_2}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_3}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_4}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_5}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_6}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_7}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_8}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        <Ailment_Data_Pars_Handler
                        effect_id={effect_id_9}
                        castlocation={castlocation}
                        currentrank={currentrank}
                        currentlevel={currentlevel}
                        currentturns={currentturns}
                        currentenemies={currentenemies}
                        currentstacks={currentstacks}
                        currentdebuffsranks={currentdebuffsranks}
                        currentdebuffsmuliply={currentdebuffsmuliply}
                        currentbuffsranks={currentbuffsranks}
                        currentfieldbuffsranks={currentfieldbuffsranks}
                        currentbuffsmuliply={currentbuffsmuliply}
                        currentgroupstacks={currentgroupstacks}
                        currenthp={currenthp}
                        charactersleft={charactersleft}
                        />
                        {ailment_data.field_effects != undefined ?
                        <div className="">
                        <div className='spacearound'>
                                <DefaultTippy content="Field Effects">
                                <span className='fieldeffects'></span>
                                </DefaultTippy>
                            </div>
                            {ailment_data.field_effects.map((item, i) => 
                               <Ailment_Data_Pars_Field_Handler 
                               key={i} 
                               effect_id={item} 
                               slider={slider}
                               castlocation={castlocation}
                               currentrank={currentrank}
                               currentlevel={currentlevel}
                               currentturns={currentturns}
                               currentenemies={currentenemies}
                               currentstacks={currentstacks}
                               currentdebuffsranks={currentdebuffsranks}
                               currentdebuffsmuliply={currentdebuffsmuliply}
                               currentbuffsranks={currentbuffsranks}
                               currentbuffsmuliply={currentbuffsmuliply}
                               currentfieldbuffsranks={currentfieldbuffsranks}
                               currentgroupstacks={currentgroupstacks}
                               currenthp={currenthp}
                               charactersleft={charactersleft}
                               />
                            )}
                        </div>
                        :""}
                        {ailment_data.modify != undefined ?
                        <div className="introflex Dbase">
                        Modify:
                        <br/>
                            {ailment_data.modify.map((item, i) => 
                                <Ailment_Modify_Formatting 
                                key={i} 
                                modify={item}
                                />
                            )}
                        </div>
                        :""}
                        {ailment_data.levelsettings != undefined ?
                            <Ailment_Level_Settings levelsettings={ailment_data.levelsettings}/>
                        :""}

                        {metadata && metadata.split ('\n').map((item, i) => <div key={i}>{item}</div>)}

                        {ailment_data.attached != undefined ?
                            <div className='gearinfobanner newblue'>
                                <div className="unique ailmenttext">
                                Associated Casts:
                                </div>
                                <ul className="abilitybufflist">
                                {ailment_data.attached.map(function(buff){
                                    return <li className={`abilitybufficonsholder ${buff.id == attachedbuff.id ? "buffactive" : ""}`} key={buff.id}>
                                    <div className="biconspacer" onClick={() => buffattachedselect(buff)} >
                                        <DefaultTippy content={replacer_buff(buff.name)}>
                                                <img alt={buff.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/${buff.icon}`} />
                                            </DefaultTippy>
                                        </div>
                                    </li>
                                })}
                                </ul>
                            </div>
                        :""}

                        {attachedbuff.length != 0 ? 
                            <Ailment_Attached
                            key={attachedbuff.id}
                            ailment_data={attachedbuff}
                            />
                        :""}

                    </div>
                </div> 
        )
}

export default Ailment_Data_Formatting