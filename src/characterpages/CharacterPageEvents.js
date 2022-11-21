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

const CharacterPageEvent = ({match, ProcessedCharacters, char_id, filtered, jptoggledata}) => {

    const [events, setevents] = useState([]);
    const [random ] = useState(Random(7));

      useEffect(() => {
          if(filtered.EventArray && filtered.EventArray != undefined){
          setevents(filtered.EventArray)
          }
          if(filtered.EventArray && filtered.EventArray == undefined){
            setevents([])
          }
        }, [filtered])

    const [chr_list,setchr_list] = useState(Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined).sort((a,b)=>jptoggledata == true? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder))

    useEffect(()=>{
      const new_list = Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined)
      setchr_list(new_list.sort((a,b)=>jptoggledata == true? a.JPOrder - b.JPOrder : a.GLOrder - b.GLOrder))
    },[jptoggledata,ProcessedCharacters])

      if(filtered === undefined ) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

    let currentIndex = chr_list.findIndex(x => x.CharID == filtered.CharID);
    const nextIndex = (currentIndex + 1) % chr_list.length;
    const previousIndex = (currentIndex - 1) % chr_list.length;

    const nextevent = (function (){
        const holder = chr_list[nextIndex];
        if(nextIndex === 0 ){
            return false;
        } else{
            return holder;
        }
    })();

    const previousevent = (function (){
        const holder = chr_list[previousIndex];
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
          <title>{filtered.CharacterName} Events - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Upcoming events for ${filtered.CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered.CharacterName} Events`}/>
          <meta name="twitter:description" content={`Upcoming events for ${filtered.CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered.CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered.CharacterName}`}/>
          <meta property="og:title" content={`${filtered.CharacterName} Events`}/>
          <meta property="og:description" content={`Upcoming events for ${filtered.CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered.CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered.ShortName}/events`}/>
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
                          <FaceMaker match={filtered}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered}
                  pageloc={"events"}
                  subcat={"none"}
                  />
                <div className="singlepageholder">
                  {events.length == 0 ? 
                    <OhNo name={filtered.CharacterName} random={random}/> :
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
            </div>
        </div>
        )
    }
}
export default CharacterPageEvent