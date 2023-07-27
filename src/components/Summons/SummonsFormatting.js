import React, { useState, useEffect } from 'react';
import ScrollHere from '../ScrollHere.js';
import ReplacerCharacter from '../ReplacerCharacter.js';
import SummonPassiveFormatting from './SummonPassiveFormatting.js'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import CrystalBrilliance from '../../callpages/CallCrystalBrilliance.js';
import StatsMaker from '../StatsDisplay.js';
 
function SummonsFormatting({
  match,
  ProcessedSummons,
  ProcessedSummonLevels,
  ProcessedSummonPassives,
  scrollPosition 
}){

  const [searchTerm, setSearchTerm] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const summonsinglepull = ProcessedSummons.filter(function (el) {
    const summonsingle = el["SummonName"] == match;
    return summonsingle;
  });

  const summons = summonsinglepull[0];

  const [highestlvl, setHighestlvl] = useState(summons && summons.HighestLevel);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setShowFilter(window.innerWidth < 815 ? true : false)
    setHighestlvl(summons && summons.HighestLevel);
    setSearchTerm(highestlvl);
  }, [highestlvl, summons, match]);

  if(match == "Crystal"){
    return(
      <CrystalBrilliance/>
    )
  }


  const abilitypull = ProcessedSummonLevels.filter(function (el) {
    const summonsingle = el.SummonID == summonsinglepull[0].SummonID && Number(el["PassiveRank"]) == searchTerm;
    return summonsingle;
  });

  const abilities = abilitypull[0];

  const summonpassives = ProcessedSummonPassives.filter(function (el) {
    const summonsingle = el["SummonName"] == match;
    return summonsingle;
  });

  const passivelist = summonpassives;

  const sumlist = ["", "Ifrit", "Shiva", "Ramuh", "Leviathan", "Brothers", "Pandemonium", "Diabolos", "Alexander", "Odin", "Bahamut", "Chocobo", "Sylph", "Mog"]
  const colortitle = ["blackbanner", "Abanner", "Bbanner", "Dbanner", "bluebanner", "Dbanner", "Cbanner", "blackbanner", "Dbanner", "Nocolorbanner", "Bbanner", "Dbanner", "Cbanner", "Nocolorbanner"]
  const colorbase = ["blackbase", "Abase", "Bbase", "Dbase", "bluebase", "Dbase", "Cbase", "blackbase", "Dbase", "Nocolorbase", "Bbase", "Dbase", "Cbase", "Nocolorbase"]
  
  return (
    <div>
      {showFilter == true ?
        <ScrollHere /> : ""}
      <div className="suminfoholder" id="scrollhere">
        <div className="sumtitle">
          {summons.SummonName}
          {summons.JPName != null ?
            <div className="jpcharsubtexttitle">
              {summons.JPName}
            </div>
            : ""}
        </div>
        <div className="sumdescholder">
          <div className="sumimgholder">
            <LazyLoadImage 
            scrollPosition={scrollPosition}
            effect="opacity" 
            className="sumimg" 
            alt={summons.SummonName} 
            src={"https://dissidiacompendium.com/images/static/icons/summons/face/" + summons.SummonFace} />
            <img className={`${summons.SummonName == "Odin" ? "sumelehelper" : summons.SummonName == "Bahamut" ? "sumelehelper" : summons.SummonName == "Chocobo" ? "sumelehelper" : "nohelper"} sumele`} alt={summons.ElementIcon} src={"https://dissidiacompendium.com/images/static/icons/" + summons.ElementIcon} />
            <span className="sumlv">LV.{searchTerm}</span>
            <input
              className="sumslider"
              onChange={handleChange}
              defaultValue={highestlvl}
              type="range"
              min={1}
              max={highestlvl}
              id="summonlevel" />
            {abilities == undefined ? "" :
              <div className="sumphase margauto">
                <div className="topphase addbordertop addborderbottom">
                  <div className="phaseart">
                    Speed
                  </div>
                  <div className="phaseart">
                    Turns
                  </div>
                  <div className="phaseart">
                    MAX BRV
                  </div>
                </div>
                <div className="bottomphase addborderbottom">
                  <div className="phaseart">
                    {abilities.AbilitySpeed}
                  </div>
                  <div className="phaseart">
                    {abilities.AbilityTurns}
                  </div>
                  <div className="phaseart">
                    {"+" + abilities.AbilityMAXBRV.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </div>}
          </div>
          <div className="sumabilholder">
            {abilities == undefined ? "" :
              <div className="sumabilitydesc makefull">
                <div className={`infonameholder ${colortitle[sumlist.indexOf(match)]}`} >
                  <span className="smallspecial" />&nbsp;{match.PassiveName}{`${summons.SummonName}'s Blessing`}
                  {summons.JPName != null ?
                    <div className="abilityJPname">
                      {summons.JPName}の加護
                    </div>
                    : ""}
                </div>
                <div className={`infobase lowerspace ${colorbase[sumlist.indexOf(match)]}`}>
                  {abilities.Blessing == undefined ? "" : ReplacerCharacter(abilities.Blessing,{updown:true})}
                </div>
              </div>
            }
            {abilities == undefined ? "" :
              <div className="sumabilitydesc makefull" >
                <div className={`infonameholder ${colortitle[sumlist.indexOf(match)]}`}>
                  Ability: {abilities.AbilityName}{abilities.PassiveRank > 30 ? "+" : ""}
                  {abilities.JPAbilityName != null ?
                    <div className="abilityJPname">
                      召唤:{abilities.JPAbilityName}{abilities.PassiveRank > 30 ? "+" : ""}
                    </div>
                    : ""}
                </div>
                <div className={`infobase ${colorbase[sumlist.indexOf(match)]}`}>
                  {abilities.AbilityDesc == undefined ? "" : ReplacerCharacter(abilities.AbilityDesc,{updown:true})}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {passivelist.length == 0 ? <br /> :
        <div className="sumpassiveholder">
          <div className="sumboardheader">Boards</div>
          <div className="sumdescholder">
            <StatsMaker
            title="Board Mastery Stats"
            HP={summons.MasteryHP}
            INTBRV={summons.MasteryINTBRV}
            MAXBRV={summons.MasteryMAXBRV}
            DEF={summons.MasteryDEF}
            ATK={summons.MasteryATK}
            />
            <div className="sumabilholder">
              {passivelist.map(passives => (
                <SummonPassiveFormatting key={passives.SummonPassKey} match={passives} />
              ))}
            </div>
          </div>
        </div>}
    </div>
  )
}

export default trackWindowScroll(SummonsFormatting)