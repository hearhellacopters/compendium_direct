import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, Navigate } from 'react-router-dom';
import './Summons.css'
import { Helmet } from 'react-helmet-async';
import SummonsFormatting from './formatting/SummonsFormatting';

const Summons = ({
  match,
  ProcessedSummons,
  ProcessedSummonLevels,
  ProcessedSummonPassives
}) => {

  const [locator, setLocator] = useState(capitalize(match.params.id));

  const urls = ["", "Ifrit", "Shiva", "Ramuh", "Leviathan", "Brothers", "Pandemonium", "Diabolos", "Alexander", "Odin", "Bahamut", "Chocobo", "Sylph", "Mog"]

  useEffect(() => {
    setLocator(capitalize(match.params.id))
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
    return (
      <Navigate replace to="/404" />
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
                  <li alt="Ifrit" onClick={ifritbutton} className={`${locator == "Ifrit" ? "gemactive" : "geminactive"} IfritIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/shiva`}>
                  <li alt="Shiva" onClick={shivabutton} className={`${locator == "Shiva" ? "gemactive" : "geminactive"} ShivaIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/ramuh`}>
                  <li alt="Ramuh" onClick={ramuhbutton} className={`${locator == "Ramuh" ? "gemactive" : "geminactive"} RamuhIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/leviathan`}>
                  <li alt="Leviathan" onClick={leviathanbutton} className={`${locator == "Leviathan" ? "gemactive" : "geminactive"} LeviathanIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/brothers`}>
                  <li alt="Brothers" onClick={brothersbutton} className={`${locator == "Brothers" ? "gemactive" : "geminactive"} BrothersIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/pandemonium`}>
                  <li alt="Pandemonium" onClick={pandemoniumbutton} className={`${locator == "Pandemonium" ? "gemactive" : "geminactive"} PandemoniumIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/diabolos`}>
                  <li alt="Diabolos" onClick={diabolosbutton} className={`${locator == "Diabolos" ? "gemactive" : "geminactive"} DiabolosIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/alexander`}>
                  <li alt="Alexander" onClick={alexanderbutton} className={`${locator == "Alexander" ? "gemactive" : "geminactive"} AlexanderIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/odin`}>
                  <li alt="Odin" onClick={odinbutton} className={`${locator == "Odin" ? "gemactive" : "geminactive"} OdinIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/bahamut`}>
                  <li alt="Bahamut" onClick={bahamutbutton} className={`${locator == "Bahamut" ? "gemactive" : "geminactive"} BahamutIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/chocobo`}>
                  <li alt="Chocobo" onClick={chocobobutton} className={`${locator == "Chocobo" ? "gemactive" : "geminactive"} ChocoboIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/sylph`}>
                  <li alt="Sylph" onClick={sylphbutton} className={`${locator == "Sylph" ? "gemactive" : "geminactive"} SylphIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/mog`}>
                  <li alt="Mog" onClick={mogbutton} className={`${locator == "Mog" ? "gemactive" : "geminactive"} MogIcon summonsgem`} ></li>
                </Link>
                <Link to={`/bonuses/crystal/passives`}>
                  <li alt="Crystal Brilliance" onClick={mogbutton} className={`${locator == "Crystal" ? "gemactive" : "geminactive"} all_nodes summonsgemshadow`} ></li>
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

export default Summons;
