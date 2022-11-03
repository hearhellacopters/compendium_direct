import React, {useState, useEffect} from 'react';
import DefaultTippy from './TippyDefaults.js';
import '../Buffs.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import addformatting from '../processing/replacer_buffcontent.js';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const EnemyBuffsStarting = ({ match }) => {

    return(
        <div className="buffunit">
            <div className="infoholder">
                <div className="infotitleholderenemybuff">

                          <LazyLoadImage effect="opacity" className="bufficonenemy" alt={match.CastName && match.CastName} src={"https://dissidiacompendium.com/images/static/" + match.CastIcon }/>
            </div>
                <div className={match.BuffType + "banner infonameholderenemybuff"}>
                    <div className="infotitle">
                        {match.CastName && addformatting(match.CastName)}
                        {match.JPName && 
                        <div className="abilityJPname">
                        {match.JPName && addformatting(match.JPName)}
                        </div>}
                    </div>
                </div>
                <div className={match.BuffType + "base infobase"}>
                    {match.Desc && addformatting(match.Desc)} 
                </div>
            </div>
        </div>
    )
}

export default EnemyBuffsStarting;