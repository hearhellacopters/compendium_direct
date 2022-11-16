import React, { useState, useEffect } from 'react';
import EventListing from '../../formatting/SingleEventsFormatting.js'
import DefaultTippy from '../../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../../formatting/ScrollToTop.js'
import Random from '../../processing/Random.js'
import '../../characterpages/CharacterPage.css'
import FaceMaker from '../../formatting/CharFaceFormatting.js'
import CharcterHeader from '../CharacterHeader.js'
import OhNo from '../OhNo.js'
import EnemyListingDirect from '../../formatting/EnemyListingDirect';

const EventPageFormatting = ({
    match, 
    ProcessedCharacters,
    EnemiesForCharacters
}) => {

    const [events, setevents] = useState([]);
    const [random ] = useState(Random(7));

      const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      useEffect(() => {
        const eventsholder = []
          if(filtered[0].EventArray && filtered[0].EventArray != undefined){
          eventsholder.push(filtered[0].EventArray)
          setevents(eventsholder[0])
          }
          if(filtered[0].EventArray && filtered[0].EventArray == undefined){
            setevents([])
          }
        }, [filtered])

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
          <title>{filtered[0].CharacterName} Events - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Upcoming events for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Events`}/>
          <meta name="twitter:description" content={`Upcoming events for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Events`}/>
          <meta property="og:description" content={`Upcoming events for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/events`}/>
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
                  Subheader={"Events"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={match.params.type}
                  subcat={"events"}
                  />
                  {match.params.type == "events"?
                  <div className="singlepageholder">
                  {events.length == 0 ? 
                    <OhNo name={filtered[0].CharacterName} random={random}/> :
                  <div>
                    <ul className="singleventholder nolist">
                    <div className="similarbanner addbordertop addborderbottom">Featured Events</div>
                      {events.map(events =>(
                        <EventListing 
                        key={events.eventindex}
                        match={events}
                        permapage={false}/>
                      ))}
                      </ul>
                      <span className="smallsubtext">*from current GL</span>
                    </div>}
                </div>
                  :""}
                  {match.params.type == "enemies"?        
                  <div className="singleventholder nolist">        
                  <div className="znone">
                    <div className="enemyunits" >
                        <div className="featuredbanner">Orb / Force Helper</div>
                        <ul className="charenemyevents">
                        {EnemiesForCharacters.length == 0?
                            <OhNo name={filtered[0].CharacterName} random={random}/>
                            :
                            EnemiesForCharacters.map(Enemy => (
                            <EnemyListingDirect key={Enemy.battle_enemy_id} match={Enemy}/>
                        ) )}
                     </ul>
                     </div>
                     </div>
                     <span className="subtextchrenemy">*Doesn't take resistances into account</span>
                     </div> 
                  :""}
            </div>
        </div>
        )
    }
}
export default EventPageFormatting