import React, {useState, useEffect} from 'react';
import replacer_title from '../processing/replacer_titles'
import '../Buffs.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Ailment_Data_Formatting from './Buff_Handler/Ailment_Data_Formating';

const BuffsForEnemiesDirect= ({ match }) => {

    return(
        <div className="buffunit">
            <div className="infoholder">
                <div className="infotitleholderenemybuff">
                    <LazyLoadImage effect="opacity" className="bufficonenemy" alt={match.name && match.name} src={"https://dissidiacompendium.com/images/static/" + match.icon }/>
                </div>
                <div className={`${match.is_buff == 0 ? "Debuff" : "Buff"}banner infonameholderenemybuff`}>
                    <div className="infotitle">
                        {match.name && replacer_title(match.name)}{` #${match.id}`}
                        {match.jpname == "" || match.jpname == undefined?
                        <div className="abilityJPname">
                            {replacer_title(match.name)}
                        </div>
                        :
                        <div className="abilityJPname">
                        {match.jpname && replacer_title(match.jpname)}
                        </div>}
                    </div>
                </div>

                <div className={`${match.is_buff == 0 ? "Debuff" : "Buff"}base infobase`}>
                    <Ailment_Data_Formatting ailment_data={match}/>
                </div>
            </div>
        </div>
    )
}

export default BuffsForEnemiesDirect;