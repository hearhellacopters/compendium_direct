import React, { useState, useEffect } from 'react';
import EventListing from '../formatting/SingleEventsFormatting.js'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../formatting/ScrollToTop.js'
import Random from '../processing/Random.js'
import OhNo from './OhNo.js'
import '../characterpages/CharacterPage.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import FaceMaker from '../formatting/CharFaceFormatting.js'
import CharcterHeader from './CharacterHeader.js'
import ReworkPassiveFormatting from '../formatting/ReworkPageFormatting.js'
import ReworkGearFormatting from '../formatting/ReworkGearPageFormatting.js'

const ReworksPageFormatting = ({match, ProcessedBuffs, ProcessedReworks, ProcessedCharacters,jptoggledata}) => {

    const [reworks, setreworks] = useState(ProcessedReworks);
    const [random ] = useState(Random(7));

      const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      if(filtered.length === 0 ) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

          let currentIndex = ProcessedCharacters.findIndex(x => x.GLOrder == filtered[0].GLOrder);
    const nextIndex = (currentIndex + 1) % ProcessedCharacters.length;
    const previousIndex = (currentIndex - 1) % ProcessedCharacters.length;

    const nextevent = (function (){
        const holder = ProcessedCharacters[nextIndex];
        if(nextIndex === 0 ){
            return false;
        } else{
            return holder;
        }
    })();

    const previousevent = (function (){
        const holder = ProcessedCharacters[previousIndex];
        if(holder === undefined ){
            return false;
        } else{
            return holder;
        }
    })();


    return (
        <div className="wrapper">
            <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} Reworks - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Upcoming Reworks for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Reworks`}/>
          <meta name="twitter:description" content={`Upcoming Reworks for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={filtered[0].CardURL}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Reworks`}/>
          <meta property="og:description" content={`Upcoming Reworks for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={filtered[0].CardURL}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/reworks`}/>
        </Helmet>
            <div className="returnbutton">
                <DefaultTippy content="Return to Characters" className="tooltip" >
                <Link className="returnlink" to={`/characters/`}>
                    <div className="returnicon"></div>
                </Link>
                </DefaultTippy>
            </div>
            <div className="content">
            <CharcterHeader
                  nextevent={nextevent}
                  previousevent={previousevent}
                  Subheader={"Upcoming Reworks"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={"reworks"}
                  subcat={"none"}
                  />
                <div className="singlepageholder">
                  {reworks.length == 0 ? 
                    <OhNo name={filtered[0].CharacterName} random={random}/> :
                  reworks.map(passives => (
                    passives.GearKey == undefined ?
                    <ReworkPassiveFormatting 
                    key={passives.PassiveKey}
                    match={passives}
                    ProcessedBuffs={ProcessedBuffs}
                    jptoggledata={jptoggledata}
                    />
                    :
                    <ReworkGearFormatting
                    key={passives.GearKey}
                    match={passives}
                    ProcessedBuffs={ProcessedBuffs}
                    jptoggledata={jptoggledata}
                    />
                  ))}
                </div>
            </div>
        </div>
        )
    }
}
export default ReworksPageFormatting