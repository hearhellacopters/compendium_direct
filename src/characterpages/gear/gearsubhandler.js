import React, { useState, useEffect } from 'react';
import GearFormatting from '../../formatting/GearFormatting.js'
import DefaultTippy from '../../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../../formatting/ScrollToTop.js'
import Random from '../../processing/Random.js'
import OhNo from '../OhNo.js'
import '../../characterpages/CharacterPage.css'
import FaceMaker from '../../formatting/CharFaceFormatting.js'
import CharcterHeader from '../CharacterHeader.js'

const GearPageFormatting = ({match, ProcessedGear, ProcessedCharacters, type, ProcessedBuffs, jptoggledata}) => {

    const [random, setRandom] =useState(1);

    function typehandler(type){
      if(type == "4stararmor"){
        return 1
      }
      if(type == "bloomstone"){
        return 10
      }
      if(type == "35armor"){
        return 2
      }
      if(type == "hgarmor"){
        return 3
      }
      if(type == "hgplusarmor"){
        return 4
      }
      if(type == "7stararmor"){
        return 11
      }
      if(type == "7starplusarmor"){
        return 12
      }
      if(type == "4starweapon"){
        return 50
      }
      if(type == "15weapon"){
        return 51
      }
      if(type == "woiweapon"){
        return 52
      }
      if(type == "ntweapon"){
        return 54
      }
      if(type == "35weapon"){
        return 53
      }
      if(type == "darkweapon"){
        return 55
      }
      if(type == "exweapon"){
        return 56
      }
      if(type == "ldweapon"){
        return 57
      }
      if(type == "explusweapon"){
        return 70
      }
      if(type == "frweapon"){
        return 75
      }
      if(type == "btweapon"){
        return 90
      }
      if(type == "btplusweapon"){
        return 95
      }
      if(type == "gloss"){
        return 80
      }
    }

    function subhandler(type){
      if(type == "weapons"){
        return "All Weapons"
      }
      if(type == "armor"){
        return "All Armor"
      }
      if(type == "4stararmor"){
        return "4★ Armor"
      }
      if(type == "bloomstone"){
        return "Bloom Stone"
      }
      if(type == "35armor"){
        return "35CP Armor"
      }
      if(type == "hgarmor"){
        return "HG Armor"
      }
      if(type == "hgplusarmor"){
        return "HG+ Armor"
      }
      if(type == "7stararmor"){
        return "7★ Armor"
      }
      if(type == "7starplusarmor"){
        return "7★+ Armor"
      }
      if(type == "4starweapon"){
        return "4★ Weapon"
      }
      if(type == "15weapon"){
        return "15CP Weapon"
      }
      if(type == "woiweapon"){
        return "World of Illusions Weapon"
      }
      if(type == "ntweapon"){
        return "NT Weapon"
      }
      if(type == "35weapon"){
        return "35CP Weapon"
      }
      if(type == "darkweapon"){
        return "Dark Weapon"
      }
      if(type == "exweapon"){
        return "EX Weapon"
      }
      if(type == "ldweapon"){
        return "LD Weapon"
      }
      if(type == "frweapon"){
        return "FR Weapon"
      }
      if(type == "explusweapon"){
        return "EX+ Weapon"
      }
      if(type == "btweapon"){
        return 'BT Weapon'
      }
      if(type == "btplusweapon"){
        return "BT+ Weapon"
      }
      if(type == "gloss"){
        return "Gloss"
      }
    }


    useEffect(() => {
      setRandom(Random(7))
      }, [])
    
    const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      const filteredchar = ProcessedGear.filter(function (el) { 
        if(type == "weapons"){
          return el["CharID"] == filtered[0].CharID && el["GearRank"] >= 50; 
        }
        if(type == "armor"){
          return el["CharID"] == filtered[0].CharID && el["GearRank"] <= 49; 
        } else {
          return el["CharID"] == filtered[0].CharID && el["GearRank"] === typehandler(type) ;
        }
      }); 



      if(filtered.length === 0  || filteredchar.length === 0) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

          

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
          

          const char = filteredchar;

    return (
        <div className="wrapper">
            <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} {subhandler(type)} - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`${filteredchar[0].GearName} ${subhandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} ${subhandler(type)}`}/>
          <meta name="twitter:description" content={`${filteredchar[0].GearName} ${subhandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={filteredchar[0].GearURL}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filteredchar[0].GearName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} ${subhandler(type)}`}/>
          <meta property="og:description" content={`${filteredchar[0].GearName} ${subhandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={filteredchar[0].GearURL}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/gear/${subhandler(type)}`}/>
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
                  nextevent={false}
                  previousevent={false}
                  Subheader={subhandler(type)}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={subhandler(type)}
                  subcat={"gear"}
                  skin={skin}
                  onlyarmor={onlyarmor}
                  onlyweapons={onlyweapons}
                  weaponbtplus={weaponbtplus}
                  weaponbt={weaponbt}
                  weaponfr={weaponfr}
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