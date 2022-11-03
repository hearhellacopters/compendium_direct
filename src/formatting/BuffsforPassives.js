import React, {useState } from 'react';
import addformatting from '../processing/replacer_abilitycontent.js';
import DefaultTippy from './TippyDefaults.js';
import BuffHandoff from '../passoff/SingleBuffFormatting.js'

const BuffsforPassive = ({match, ProcessedBuffs ,jptoggledata}) => {

    const [selectedbuff, setselectedbuff] = useState([]);

    const buffselect = (buffs) =>{
        if(selectedbuff == buffs ){
            setselectedbuff([])
        } else {
        setselectedbuff(buffs)
        }
    }

    const buffsholder = [];
    // eslint-disable-next-line
    const filteredout = ProcessedBuffs.filter(function (ef) {
    const newfilterpull = ef["PassiveRank"] === match.PassiveRank && ef["CharID"] === match.CharID;
    return newfilterpull;
    })
    buffsholder.push(...filteredout)
                
    const bufflist = [...buffsholder];

    if(bufflist.length == 0 ) {
    return(
        null
    )
    } else {
        return(
            <div>
            <div className={`bufflistbanner noselect newblue`}>
                <div className="unique ailmenttext">Buffs / Debuffs:</div>
                    <ul className="abilitybufflist">
                    {bufflist.map(function(buffs){
                    return  <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                    <DefaultTippy content={
                                        buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)
                                        }>
                                        <img alt={buffs.BuffNameDisplay && buffs.BuffNameDisplay} className="clicky abilitybufficon" src={"https://dissidiacompendium.com/images/static/icons/" + buffs.BuffURL} />
                                    </DefaultTippy>
                                </div>
                            </li>;
                            })}
                    </ul>
                </div>
            {selectedbuff.length == 0 ? "" :
            <BuffHandoff match={selectedbuff} jptoggledata={jptoggledata}/>}
            </div>
        )
    }
}
export default BuffsforPassive;