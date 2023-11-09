import React, { useState, useEffect } from 'react';
import ScrollHere from './components/ScrollHere.js';
import Tippy from './components/TippyDefaults.js';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import  {getQuery } from './components/URLParams.js'
import SummonsFormatting from './components/Summons/SummonsFormatting';

export default function Summons({
  match,
  ProcessedSummons,
  ProcessedSummonLevels,
  ProcessedSummonPassives
}){

  const [locator, setLocator] = useState(capitalize(match.params.id));
  const [scrollhere, setscrollhere] = useState(<></>) 

  const urls = ["", "Ifrit", "Shiva", "Ramuh", "Leviathan", "Brothers", "Pandemonium", "Diabolos", "Alexander", "Odin", "Bahamut", "Chocobo", "Sylph", "Mog"]

  useEffect(() => {
    setLocator(capitalize(match.params.id))
    setscrollhere(<span className="storyscroll_offset" id="scrollhere"><ScrollHere></ScrollHere></span>)
    setTimeout(() => setscrollhere(<></>), 1000);
    // eslint-disable-next-line
  }, [match])

  function capitalize(str) {
    if (str !== undefined) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return ""
    }
  }

  const filtered = urls.filter(function (el) {
    return el == capitalize(match.params.id);
  });

  if (filtered.length === 0 && match.params.id != "crystal") {
    const { pathname } = window.location;
    const query = getQuery();
    const url = `${pathname}?${query.toString()}`;
    return (
      <Navigate replace to="/404" state={{loc:url}}/>
    )
  } else {

    const ifritbutton = () => {
      setLocator("Ifrit");

    };
    const shivabutton = () => {
      setLocator("Shiva");

    };
    const ramuhbutton = () => {
      setLocator("Ramuh");

    };
    const leviathanbutton = () => {
      setLocator("Leviathan");

    };
    const brothersbutton = () => {
      setLocator("Brothers");

    };
    const pandemoniumbutton = () => {
      setLocator("Pandemonium");

    };
    const diabolosbutton = () => {
      setLocator("Diabolos");

    };
    const alexanderbutton = () => {
      setLocator("Alexander");

    };
    const odinbutton = () => {
      setLocator("Odin");

    };
    const bahamutbutton = () => {
      setLocator("Bahamut");

    };
    const chocobobutton = () => {
      setLocator("Chocobo");

    };
    const sylphbutton = () => {
      setLocator("Sylph");
    };
    const mogbutton = () => {
      setLocator("Mog");
    };


    const params = match.params.id;

    const titlestring = `${(match.params.id !== undefined ? capitalize(match.params.id) + " " : "") + "Summons"} - Dissidia Compendium`;

    return (
      <div>
        <Helmet>
          <title>{titlestring}</title>
          <meta property="og:site_name" content="Dissidia Compendium" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://dissidiacompendium.com" />
          <meta name="description" content={`Summon Info`} />
          <meta name="twitter:title" content={`${(match.params.id !== undefined ? capitalize(match.params.id) + " " : "") + `${match.params.id == "crystal"?"Passives":"Summon"}`} - Dissidia Compendium`} />
          <meta name="twitter:description" content={`Party Bonuses Info`} />
          <meta property="og:title" content={`${(match.params.id !== undefined ? capitalize(match.params.id) + " " : "") + `${match.params.id == "crystal"?"Passives":"Summon"}`} - Dissidia Compendium`} />
          <meta property="og:description" content={`Party Bonuses Info`} />
        </Helmet>
        <div className="content">
          <h1>Party Bonuses</h1>
          <div className="filterholder noselect">
            <div className="sumsubheader">Select a Bonus</div>
            <div className="filterholderflair">
              <ul className="summoniconholder">
                <Link to={`/bonuses/ifrit`}>
                  <Tippy content={"Ifrit"}>
                    <li alt="Ifrit" onClick={ifritbutton} className={`${locator == "Ifrit" ? "gemactive" : "geminactive"} IfritIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/shiva`}>
                  <Tippy content={"Shiva"}>
                    <li alt="Shiva" onClick={shivabutton} className={`${locator == "Shiva" ? "gemactive" : "geminactive"} ShivaIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/ramuh`}>
                  <Tippy content={"Ramuh"}>
                    <li alt="Ramuh" onClick={ramuhbutton} className={`${locator == "Ramuh" ? "gemactive" : "geminactive"} RamuhIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/leviathan`}>
                  <Tippy content={"Leviathan"}>
                    <li alt="Leviathan" onClick={leviathanbutton} className={`${locator == "Leviathan" ? "gemactive" : "geminactive"} LeviathanIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/brothers`}>
                  <Tippy content={"The Brothers"}>
                    <li alt="Brothers" onClick={brothersbutton} className={`${locator == "Brothers" ? "gemactive" : "geminactive"} BrothersIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/pandemonium`}>
                  <Tippy content={"Pandemonium"}>
                    <li alt="Pandemonium" onClick={pandemoniumbutton} className={`${locator == "Pandemonium" ? "gemactive" : "geminactive"} PandemoniumIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/diabolos`}>
                  <Tippy content={"Diabolos"}>
                    <li alt="Diabolos" onClick={diabolosbutton} className={`${locator == "Diabolos" ? "gemactive" : "geminactive"} DiabolosIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/alexander`}>
                  <Tippy content={"Alexander"}>
                    <li alt="Alexander" onClick={alexanderbutton} className={`${locator == "Alexander" ? "gemactive" : "geminactive"} AlexanderIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/odin`}>
                  <Tippy content={"Odin"}>
                    <li alt="Odin" onClick={odinbutton} className={`${locator == "Odin" ? "gemactive" : "geminactive"} OdinIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/bahamut`}>
                  <Tippy content={"Bahamut"}>
                    <li alt="Bahamut" onClick={bahamutbutton} className={`${locator == "Bahamut" ? "gemactive" : "geminactive"} BahamutIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/chocobo`}>
                  <Tippy content={"Chocobo"}>
                    <li alt="Chocobo" onClick={chocobobutton} className={`${locator == "Chocobo" ? "gemactive" : "geminactive"} ChocoboIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                {locator != ""?
                  scrollhere
                :""}
                <Link to={`/bonuses/sylph`}>
                  <Tippy content={"Sylph"}>
                    <li alt="Sylph" onClick={sylphbutton} className={`${locator == "Sylph" ? "gemactive" : "geminactive"} SylphIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/mog`}>
                  <Tippy content={"Mog"}>
                    <li alt="Mog" onClick={mogbutton} className={`${locator == "Mog" ? "gemactive" : "geminactive"} MogIcon summonsgem`} ></li>
                  </Tippy>
                </Link>
                <Link to={`/bonuses/crystal/passives`}>
                  <Tippy content={"Crystal Room"}>
                    <li alt="Crystal Room" onClick={mogbutton} className={`${locator == "Crystal" ? "gemactive" : "geminactive"} all_nodes summonsgemshadow`} ></li>
                  </Tippy>
                </Link>
              </ul>
            </div>
          </div>
          {params == undefined ? "" :
            <SummonsFormatting
              key={match.params.id}
              match={capitalize(match.params.id)}
              ProcessedSummons={ProcessedSummons}
              ProcessedSummonLevels={ProcessedSummonLevels}
              ProcessedSummonPassives={ProcessedSummonPassives}
            />
          }
        </div>
      </div>
    );
  }
}