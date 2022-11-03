import React, {useState } from 'react';
import addformatting from '../processing/replacer_abilitycontent.js';
import DefaultTippy from './TippyDefaults.js';
import BuffHandoff from '../passoff/SingleBuffFormatting.js'

const BuffsforBattleState = ({bufflist, full, ProcessedBuffs, jptoggledata}) => {

    const [selectedbuff, setselectedbuff] = useState([]);

    const buffselect = (buffs) =>{
        if(selectedbuff == buffs ){
            setselectedbuff([])
        } else {
        setselectedbuff(buffs)
        }
    }

    if(bufflist.length == 0 ) {
    return(
        null
    )
    } else {
        return(
            <div>
            <div className={`bufflistbannerbattle noselect ${full == true ? "fullnow" : ""} newblue`}>
                <div className="unique ailmenttext">Buffs / Debuffs:</div>
                    <ul className="abilitybufflist">
                    {bufflist.map(function(buffs){
                    return  <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                    <DefaultTippy content={
                                        buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)
                                        }>
                                        <img alt={buffs.BuffNameDisplay} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                    </DefaultTippy>
                                </div>
                            </li>;
                            })}
                    </ul>
                </div>
            {selectedbuff.length == 0 ? "" :
            <BuffHandoff 
            full={full}
            bstate={true}
            match={selectedbuff}
            ProcessedBuffs={ProcessedBuffs}
            jptoggledata={jptoggledata}
            />}
            </div>
        )
    }
}
export default BuffsforBattleState;