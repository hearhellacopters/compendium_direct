import React, { useState, useEffect} from 'react';
import '../characterpages/CharacterPage.css'
import SpheresFormatting from '../formatting/SpheresFormatting.js'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../formatting/ScrollToTop.js'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OhNo from '../characterpages/OhNo.js'
import Random from '../processing/Random.js'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import FaceMaker from '../formatting/CharFaceFormatting.js'
import CharcterHeader from './CharacterHeader.js'

const SpheresPageFormatting = ({match, ProcessedCharacters, ProcessedSpheres}) => {

    const [random, setRandom] =useState(1);

    useEffect(() => {
        setRandom(Random(7))
      }, [])
    
    const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      if(filtered.length === 0 ) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

        const filteredchar = ProcessedSpheres.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID ; 
          }); 

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

          const char = filteredchar;

    return (
        <div className="wrapper">
             <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} Spheres - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of all spheres for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Spheres`}/>
          <meta name="twitter:description" content={`Listing of all spheres for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={filtered[0].CardURL}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Spheres`}/>
          <meta property="og:description" content={`Listing of all spheres for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={filtered[0].CardURL}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/spheres`}/>
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
                  Subheader={"Spheres"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={"spheres"}
                  subcat={"none"}
                  />
                <div className="singlepageholder">
                  {filtered[0].Sphere1URL == undefined ? "" :
                  <div className="">
                    <div className="singlesubbanner">{filtered[0].CharacterName}{"'s Slots"}</div>
                  <div className="sphereletterholder filterholderflair somepadding">
                    <div className={`sphereletter ${filtered[0].SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
                    <LazyLoadImage effect="opacity" src={filtered[0].Sphere1URL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : "https://dissidiacompendium.com/images/static/icons/spheres/" + filtered[0].Sphere1URL} alt={filtered[0].SphereSlot1Letter}/>
                    </div>
                    <div className={`sphereletter ${filtered[0].SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
                    <LazyLoadImage effect="opacity" src={filtered[0].Sphere2URL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : "https://dissidiacompendium.com/images/static/icons/spheres/" + filtered[0].Sphere2URL} alt={filtered[0].SphereSlot2Letter}/>
                    </div>
                    <div className={`sphereletter ${filtered[0].SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
                    <LazyLoadImage effect="opacity" src={filtered[0].Sphere2URL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : "https://dissidiacompendium.com/images/static/icons/spheres/" + filtered[0].Sphere3URL} alt={filtered[0].SphereSlot3Letter}/>
                    </div>
                    </div>
                  </div>}
                    {char.length > 0 ?  (
                    char.map(spheres => (
                    <SpheresFormatting 
                    key={spheres.SphereKey}
                    match={spheres}
                    singlepage={true}
                    />
                    ))) : (
                      <OhNo random={random} name={filtered[0].CharacterName}/>
                    )}
                </div>
            </div>
        </div>
        )
    }
}
export default SpheresPageFormatting