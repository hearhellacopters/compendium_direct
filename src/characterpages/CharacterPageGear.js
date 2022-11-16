import React, { useState, useEffect } from 'react';
import GearFormatting from '../formatting/GearFormatting.js'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../formatting/ScrollToTop.js'
import OhNo from '../characterpages/OhNo.js'
import Random from '../processing/Random.js'
import '../characterpages/CharacterPage.css'
import FaceMaker from '../formatting/CharFaceFormatting.js'
import CharcterHeader from './CharacterHeader.js'

const GearPageFormatting = ({match, ProcessedCharacters, ProcessedGear, ProcessedBuffs, jptoggledata}) => {

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

          const filteredchar = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID ; 
          }); 
          const onlyarmor = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] <= 49; 
          }); 
          const onlyweapons = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] >= 50; 
          });
          const armor4 = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 1 ; 
          }); 
          const armor35 = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 2 ; 
          }); 
          const armorhg = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 3 ; 
          }); 
          const armorhgplus = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 4 ; 
          }); 
          const bloom = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 10 ; 
          }); 
          const armor7 = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 11 ; 
          }); 
          const armor7plus = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 12 ; 
          }); 
          const weapon4 = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 50 ; 
          }); 
          const weapon15 = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 51 ; 
          }); 
          const weaponwoi = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 52 ; 
          }); 
          const weapon35 = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 53 ; 
          }); 
          const weaponnt = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 54 ; 
          }); 
          const weapondark = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 55 ; 
          }); 
          const weaponex = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 56 ; 
          }); 
          const weaponld = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 57 ; 
          }); 
          const weaponexplus = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 70 ; 
          }); 
          const weaponfr = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 75 ; 
          });
          const weaponbt = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 90 ; 
          }); 
          const weaponbtplus = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 95 ; 
          }); 
          const skin = ProcessedGear.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["GearRank"] === 80 ; 
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
          <title>{filtered[0].CharacterName} Gear - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of all gear for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Gear`}/>
          <meta name="twitter:description" content={`Listing of all gear for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Gear`}/>
          <meta property="og:description" content={`Listing of all gear for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/gear`}/>
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
                  Subheader={"Gear"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                  match={match}
                  newmatch={filtered[0]}
                  pageloc={"gear"}
                  subcat={"gear"}
                  skin={skin}
                  weaponfr={weaponfr}
                  onlyarmor={onlyarmor}
                  onlyweapons={onlyweapons}
                  weaponbtplus={weaponbtplus}
                  weaponbt={weaponbt}
                  weaponexplus={weaponexplus}
                  weaponld={weaponld}
                  weaponex={weaponex}
                  weapondark={weapondark}
                  weapon35={weapon35}
                  weaponnt={weaponnt}
                  weaponwoi={weaponwoi}
                  weapon15={weapon15}
                  weapon4={weapon4}
                  armor7plus={armor7plus}
                  armor7={armor7}
                  armorhgplus={armorhgplus}
                  armorhg={armorhg}
                  armor35={armor35}
                  armor4={armor4}
                  bloom={bloom}
                  />
                <div className="singlepageholder">
                    {char.length > 0 ?  (
                    char.map(gear => (
                    <GearFormatting 
                    key={gear.GearKey}
                    match={gear}
                    ProcessedBuffs={ProcessedBuffs}
                    jptoggledata={jptoggledata}
                    />
                    ))) : ""}
                </div>
            </div>
        </div>
        )
    }
}
export default GearPageFormatting