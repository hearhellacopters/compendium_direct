import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import './CharacterPage.css'
import '../../Spheres.css'
import '../../Events.css'
import DefaultTippy from '../TippyDefaults.js';
import { Link } from 'react-router-dom'
import EventListing from '../Events/SingleEventsFormatting.js'
import CommunityCharacterGuideFormatting from './CharacterCommunityGuideFormatting.js'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import CharacterBrevityProfileFormatting from './CharacterBrevityProfileFormatting.js'
import TickUp from '../tickUp'
import { StartsInTimer } from '../Timers'
import ReplacerCharacter from '../ReplacerCharacter';
import Role_Maker from './CharacterRoleMarker';
import { useStateIfMounted } from 'use-state-if-mounted';
import Random from '../../processing/random.js';
import { ObjectView } from 'react-object-view'

export default function CharacterPageFormatting({
  match,
  CharGuideData,
  jptoggledata,
  ProcessedVoices,
  CharStickers
}){

  const [playingaudio, setplayingaudio] = useState(false)
  const [introvoice, setintrovoice] = useState("intro")
  const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")
  const [showraw, setshowraw] = useState(false)

  const showmeraw = (e) => {
    if (e.shiftKey) {
      if (showraw == false) {
        setshowraw(true)
      } else {
        setshowraw(false)
      }
    }
  }

  useEffect(() => {
    setintrovoice("intro")
  }, [match])

  const volume = useSelector((state) =>
    state.volume.volume
  );

  const onclick = (Voice) => {
    if(playingaudio != true){
      try {
        const myAudioElement = new Audio(`https://dissidiacompendium.com/images/static/characters/${Voice.chara}/voice/${Voice.voice}.mp3`)
        myAudioElement.volume = volume
        myAudioElement.style.display = "none"
        myAudioElement.load();
        myAudioElement.addEventListener("canplaythrough", (event) => {
          /* the audio is now playable; play it if permissions allow */
          setplayingaudio(true)
          myAudioElement.play();
        });
        myAudioElement.onended = function(){
          setplayingaudio(false)
          myAudioElement.remove();
        }
        myAudioElement.load();
      } catch (error) {
        setplayingaudio(false)
        console.log(error)
      }
    }
  }

  const onclickvoice = (Voice) => {
    if(playingaudio != true){
      try {
        const myAudioElement = new Audio(`https://dissidiacompendium.com/images/static/stamps/audio/${Voice}.mp3`)
        myAudioElement.volume = volume
        myAudioElement.style.display = "none"
        myAudioElement.load();
        myAudioElement.addEventListener("canplaythrough", (event) => {
          /* the audio is now playable; play it if permissions allow */
          setplayingaudio(true)
          myAudioElement.play();
        });
        myAudioElement.onended = function(){
          setplayingaudio(false)
          myAudioElement.remove();
        }
        myAudioElement.load();
      } catch (error) {
        setplayingaudio(false)
        console.log(error)
      }
    }
  }

  const newmatch = match

  const [artworkcount, setartworkcount] = useState(match.ArtworkCount);
  const [currentartwork, setcurrentartwork] = useState();
  const [artwork, setartwork] = useState(`https://dissidiacompendium.com/images/static/characters/${match.CharacterURLName}/c1.png`);
  const [random, setRandom] = useState(1);
  const [events, setevents] = useState([]);

  useEffect(() => {
    setartwork(`https://dissidiacompendium.com/images/static/characters/${match.CharacterURLName}/c1.png`)
    setartworkcount(match.ArtworkCount)
    setcurrentartwork(1)
  }, [match])

  const [eventsexpand, seteventsexpand] = useState(false);
  const [helpexpand, sethelpexpand] = useState(false);

  const ct = new Date().getTime();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const monthstext = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function ordinal(n) {
    var s = ["", "", "", ""];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const handledate = (date) => {
    return <div className="tickholder greencolor">
      <div className="spacerleft">
        <TickUp value={monthstext[new Date(date).getMonth()]} />
      </div>

      <div className="spacerleft">
        <TickUp value={new Date(date).getFullYear()} />
      </div>
    </div>
  }

  const CaliCon =
    <svg className="calforchar" width="20px" height="20px" viewBox="5 5 80 85">
      <path id="path3026" d="M71.4,58.3c0-9.5,0-46.4,0-46.4h-2.6H16.8l-5.6,3.3v66.9h57.7v-6h8.3C77.2,76.2,71.4,71.6,71.4,58.3z   M67.6,48.3h-9.9V37.7h9.9V48.3z M43.5,25.5v10.6h-11V25.5H43.5z M45.1,25.5h11v10.6h-11V25.5z M20.6,25.5h10.2v10.6H20.6V25.5z   M20.6,37.7h10.2v10.6H20.6V37.7z M20.6,49.9h10.2v8.4c0,0.8,0,1.5,0,2.2H20.6V49.9z M32.4,58.3v-8.4h11v8.4c0,0.8,0,1.5,0,2.2h-11  C32.4,59.8,32.4,59.1,32.4,58.3z M32.4,48.3V37.7h11v10.6H32.4z M45.1,37.7h11v10.6h-11V37.7z M67.6,36.1h-9.9V25.5h9.9V36.1z   M30.9,62.1c0.4,5.4,1.8,8.5,3.1,10.3H23.4c-0.3-0.2-0.7-0.7-1.1-1.7c-0.7-1.4-1.5-4-1.6-8.6H30.9z M36.2,72.4  c-1.3-1.2-3.1-3.9-3.6-10.3h11c0.4,5.4,1.8,8.5,3.1,10.3H36.2z M48.8,72.4c-1.3-1.2-3.1-3.9-3.6-10.3h11c0.4,5.4,1.8,8.5,3.1,10.3  H48.8z M45.1,60.5c0-0.7,0-1.4,0-2.2v-8.4h11v8.4c0,0.8,0,1.5,0,2.2H45.1z M57.8,58.3v-8.4h9.9v8.4v1.6c0,0.2,0,0.4,0,0.5h-9.8  C57.8,59.8,57.8,59.1,57.8,58.3z M65.1,78.3H15v-61l1.8-1.1c0,10.2,0,35.4,0,44.2c0,14.6,5.7,15.7,5.7,15.7h42.5L65.1,78.3  L65.1,78.3z M68.9,72.4h-3.8h-3.5c-1.3-1.2-3.1-3.9-3.6-10.3h9.8c0.2,4,0.8,7.4,2,10.3H68.9z">
      </path>
    </svg>


  useEffect(() => {
    const eventsholder = []
    if (newmatch.EventArray && newmatch.EventArray.length != 0) {
      eventsholder.push(newmatch.EventArray)
      setevents(eventsholder[0])
    } else {
      setevents([])
    }
    setRandom(Random(7))
  }, [newmatch.EventArray])

  const handleartworkchange = () => {
    if (currentartwork != artworkcount) {
      setcurrentartwork((prevValue) => prevValue + 1);
    }
    if (currentartwork == artworkcount) {
      setcurrentartwork(1)
    }
  }

  const [all_dates, setall_dates] = useStateIfMounted([])

  useEffect(() => {
    const holder = []
    if (newmatch.ReleaseDate != undefined) {
      const rework = {
        release: newmatch.ReleaseDate,
        temp: newmatch.ReleaseDateTemp,
        tag: "NewChar2",
        loc: "",
        tip: "Release"
      }
      holder.push(rework)
    }
    if (newmatch.ReworkRelease != undefined && newmatch.ActiveRework == true) {
      const rework = {
        release: newmatch.ReworkRelease,
        temp: newmatch.ReworkReleaseTemp,
        tag: "reworkicon",
        loc: "reworks",
        tip: "Rework"
      }
      holder.push(rework)
    }
    if (newmatch.NinetyRelease != undefined) {
      const ninety = {
        release: newmatch.NinetyRelease,
        temp: newmatch.NinetyReleaseTemp,
        tag: "cl90",
        loc: "passives/crystal",
        tip: "Crystal Level 90"
      }
      holder.push(ninety)
    }
    if (newmatch.EightyRelease != undefined) {
      const eighty = {
        release: newmatch.EightyRelease,
        temp: newmatch.EightyReleaseTemp,
        tag: "cl80",
        loc: "passives/crystal",
        tip: "Crystal Level 80"
      }
      holder.push(eighty)
    }
    if (newmatch.BTPlusRelease != undefined) {
      const BTPlus = {
        release: newmatch.BTPlusRelease,
        temp: newmatch.BTPlusReleaseTemp,
        tag: "wpbtplus",
        loc: "gear?BTPlus=true",
        tip: "BT+ Weapon"
      }
      holder.push(BTPlus)
    }
    if (newmatch.FRRelease != undefined) {
      const FRRelease = {
        release: newmatch.FRRelease,
        temp: newmatch.FRReleaseTemp,
        tag: "wpfr",
        loc: "gear?FR=true",
        tip: "FR Weapon"
      }
      holder.push(FRRelease)
    }
    if (newmatch.Board5Release != undefined) {
      const Board5Release = {
        release: newmatch.Board5Release,
        temp: newmatch.Board5ReleaseTemp,
        tag: "board5",
        loc: "passives/boards",
        tip: "FR Board"
      }
      holder.push(Board5Release)
    }
    if (newmatch.FRBoardRelease != undefined) {
      const FRBoardRelease = {
        release: newmatch.FRBoardRelease,
        temp: newmatch.FRBoardReleaseTemp,
        tag: "boardfr",
        loc: "passives/force",
        tip: "Force Enhancement"
      }
      holder.push(FRBoardRelease)
    }
    if (newmatch.FE50Release != undefined) {
      const FE50Release = {
        release: newmatch.FE50Release,
        temp: newmatch.FE50ReleaseTemp,
        tag: "boardfr50",
        loc: "passives/force",
        tip: "Force Enhancement Lv50"
      }
      holder.push(FE50Release)
    }
    if (newmatch.SevenArmorPlusRelease != undefined) {
      const SevenArmorPlusRelease = {
        release: newmatch.SevenArmorPlusRelease,
        temp: newmatch.SevenArmorPlusReleaseTemp,
        tag: "arm7aplus",
        loc: "gear?7APlus=true",
        tip: "7★+ Armor"
      }
      holder.push(SevenArmorPlusRelease)
    }
    if (newmatch.SevenArmorPlusRelease != undefined) {
      const SevenArmorPlusRelease = {
        release: newmatch.SevenArmorPlusRelease,
        temp: newmatch.SevenArmorPlusReleaseTemp,
        tag: "arm7aplus",
        loc: "gear?7A=true",
        tip: "7★+ Armor"
      }
      holder.push(SevenArmorPlusRelease)
    }
    const final = []
    holder.forEach(self => {
      if (self.checked != true) {
        const same = holder.filter(self2 => self2.release == self.release)
        const new_obj = {
          tag_array: same,
          release: self.release,
          temp: self.temp,
          tag: self.tag,
          tip: self.tip
        }
        final.push(new_obj)
        same.forEach(tocheck => {
          Object.assign(tocheck, { checked: true })
        })
      }
    })
    setall_dates(final.sort((a, b) => new Date(a.release) - new Date(b.release)))
    // eslint-disable-next-line
  }, [newmatch])

  return (
    <div className="characterpageholder">
      <div className="introclassflex">
        <div className="charimagetoptopholder">
          <div className={`chartopimageholder charbackground${newmatch.CrystalColor}`}>
            <DefaultTippy content={newmatch.Weapon}>
              <img onClick={showmeraw} className="charweapon" alt="Weapon" src={newmatch.Weapon == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/weapon/Icon_${newmatch.Weapon}.png`} />
            </DefaultTippy>
            <DefaultTippy content={newmatch.CrystalColor}>
              <img className="charCystal" alt="Crystal" src={newmatch.CrystalColor == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/crystalcolors/Crystal${newmatch.CrystalColor}_1.png`} />
            </DefaultTippy>
            <ul className="bufftypes sidemain">
              <DefaultTippy content={`Realm ${newmatch.Realm}`}>
                <img className="classdisplay filterinactive" alt={newmatch.Realm} src={newmatch.Realm == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/realms/name/${newmatch.Realm}.png`}></img>
              </DefaultTippy>
              {newmatch.Magic == true ?
                <DefaultTippy content="Magic Damage Type">
                  <li className="magicbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch.Melee == true ?
                <DefaultTippy content="Melee Damage Type">
                  <li className="meleebutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch.Ranged == true ?
                <DefaultTippy content="Ranged Damage Type">
                  <li className="rangedbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}

              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Fire_Damage == true ?
                <DefaultTippy content="Fire BRV Damage">
                  <li className="Firebutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Ice_Damage == true ?
                <DefaultTippy content="Ice BRV Damage">
                  <li className="Icebutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Thunder_Damage == true ?
                <DefaultTippy content="Thunder BRV Damage">
                  <li className="Thunderbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Water_Damage == true ?
                <DefaultTippy content="Water BRV Damage">
                  <li className="Waterbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Earth_Damage == true ?
                <DefaultTippy content="Earth BRV Damage">
                  <li className="Earthbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Wind_Damage == true ?
                <DefaultTippy content="Wind BRV Damage">
                  <li className="Windbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Dark_Damage == true ?
                <DefaultTippy content="Dark BRV Damage">
                  <li className="Darkbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              {newmatch[`${ver}traits`] && newmatch[`${ver}traits`].Holy_Damage == true ?
                <DefaultTippy content="Holy BRV Damage">
                  <li className="Holybutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            </ul>
            <ul className="bufftypes sideclass">
              {newmatch.ActiveRework == true ?
                <DefaultTippy content="Active JP Rework">
                  <li className="JPReworkbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
              <Role_Maker
                base={newmatch}
                newmatch={newmatch[`${ver}traits`] && newmatch[`${ver}traits`]}
                lower={false}
              />
            </ul>
            {newmatch.ArtworkCount > 1 ?
              <LazyLoadImage onClick={() => handleartworkchange(currentartwork)} effect="opacity" className="charalts clicky" alt="Stats" src={"https://dissidiacompendium.com/images/static/icons/misc/Costume2.png"} />
              : ""}
            <img className="charstats" alt="Stats" src={"https://dissidiacompendium.com/images/static/icons/stats/star/back.png"} />
            <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/HP-${newmatch.HP}.png`} />
            <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/INTBRV-${newmatch.INTBRV}.png`} />
            <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/MAXBRV-${newmatch.MAXBRV}.png`} />
            <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/ATK-${newmatch.ATK}.png`} />
            <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/DEF-${newmatch.DEF}.png`} />
            <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/SPD-${newmatch.SPD}.png`} />

            <LazyLoadImage effect="opacity" className="charmanimage" alt={newmatch.CharacterName} src={`https://dissidiacompendium.com/images/static/characters/${newmatch.CharacterURLName}/c${currentartwork}.png`} />
            <div className="spherestop">
              <div className={`sphereletter ${newmatch.SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
                <LazyLoadImage effect="opacity" src={newmatch.SphereSlot1Letter == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${newmatch.SphereSlot1Letter}.png`} alt={newmatch.Sphere1} />
              </div>
              <div className={`sphereletter ${newmatch.SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
                <LazyLoadImage effect="opacity" src={newmatch.SphereSlot2Letter == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${newmatch.SphereSlot2Letter}.png`} alt={newmatch.Sphere2} />
              </div>
              <div className={`sphereletter ${newmatch.SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
                <LazyLoadImage effect="opacity" src={newmatch.SphereSlot3Letter == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${newmatch.SphereSlot3Letter}.png`} alt={newmatch.Sphere3} />
              </div>
            </div>
            {newmatch.JPSynergyStart == undefined && newmatch.GLSynergyStart == undefined ? "" :
              <div className="syngholder2">
                {newmatch.GLSynergyStart == undefined ? "" :
                  <div className={` ${new Date(newmatch.GLSynergyStart) >= ct ? "upstat " : "downstat "}`}>
                    <span className='emoji'>🌎</span>{`${new Date(newmatch.GLSynergyStart) >= ct ? " Synergy on" : " Synergy ends"} ${new Date(newmatch.GLSynergyStart) >= ct ? `${months[new Date(newmatch.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(newmatch.GLSynergyStart).getDate())}` : `${months[new Date(newmatch.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(newmatch.GLSynergyEnd).getDate())}`}`}
                  </div>}
                {newmatch.JPSynergyStart == undefined ? "" :
                  <div className={` ${new Date(newmatch.JPSynergyStart) >= ct ? "upstat " : "downstat "}`}>
                    <span className="jpflagupdate" />{new Date(newmatch.JPSynergyStart) >= ct ? " Synergy on" : " Synergy ends"} {`${new Date(newmatch.JPSynergyStart) >= ct ? `${months[new Date(newmatch.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(newmatch.JPSynergyStart).getDate())}` : `${months[new Date(newmatch.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(newmatch.JPSynergyEnd).getDate())}`}`}
                  </div>
                }
              </div>}
          </div>
        </div>
        {newmatch.JPSynergyStart == undefined && newmatch.GLSynergyStart == undefined ? "" :
          <div className="syngholder">
            {newmatch.GLSynergyStart == undefined ? "" :
              <div className={` ${new Date(newmatch.GLSynergyStart) >= ct ? "upstat " : "downstat "}`}>
                <span className='emoji'>🌎</span>{`${new Date(newmatch.GLSynergyStart) >= ct ? " Synergy on" : " Synergy ends"} ${new Date(newmatch.GLSynergyStart) >= ct ? `${months[new Date(newmatch.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(newmatch.GLSynergyStart).getDate())}` : `${months[new Date(newmatch.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(newmatch.GLSynergyEnd).getDate())}`}`}
              </div>}
            {newmatch.JPSynergyStart == undefined ? "" :
              <div className={` ${new Date(newmatch.JPSynergyStart) >= ct ? "upstat " : "downstat "}`}>
                <span className="jpflagupdate" />{new Date(newmatch.JPSynergyStart) >= ct ? " Synergy on" : " Synergy ends"}{`${new Date(newmatch.JPSynergyStart) >= ct ? `${months[new Date(newmatch.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(newmatch.JPSynergyStart).getDate())}` : `${months[new Date(newmatch.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(newmatch.JPSynergyEnd).getDate())}`}`}
              </div>
            }
          </div>}
        <ul className="smallclass classcolor noselect">
          <div className="subpassiveflair spacearound ">
            &nbsp;Classes
          </div>
          <Role_Maker
            base={newmatch}
            newmatch={newmatch[`${ver}traits`] && newmatch[`${ver}traits`]}
            lower={true}
          />
        </ul>
        <CharacterBrevityProfileFormatting match={newmatch} />
      </div>
      {ProcessedVoices.length == 0 && CharStickers.length == 0 ?
        <div className="introcolor introflex">
          <div className="subtextinfo">Info:</div>
          <div className="subpassiveflair spacearound ">
            &nbsp;Intro
          </div>
          {newmatch.Intro}
          <div className='abilityJPname'>
            {newmatch.JPintro}
          </div>
        </div>
        :
        <div className="introcolor introflex">
          <div className="subtextinfo">Info:</div>
          <div className="subpassiveflair spacearound ">
            <span className={`charintro undertaga clicky ${introvoice == "intro" ? "buffactive" : ""}`} onClick={() => setintrovoice("intro")}></span>
            {ProcessedVoices.length != 0 ?
              <span className={`charvoice undertaga clicky ${introvoice == "voice" ? "buffactive" : ""}`} onClick={() => setintrovoice("voice")}></span>
              : ""}
            {CharStickers.length != 0 ?
              <span className={`charstamps undertaga clicky ${introvoice == "sticker" ? "buffactive" : ""}`} onClick={() => setintrovoice("sticker")}></span>
              : ""}
          </div>
          {introvoice == "voice" ? <div className="vaartist"><span className="emoji">🎤</span>{` ${ProcessedVoices[0].va} / ${ProcessedVoices[0].vajp}`}</div> : ""}
          {introvoice == "intro" ?
            <>
              {newmatch.Intro}
              <hr />
              <div className='abilityJPname '>
                {newmatch.JPintro}
              </div>
            </>
            : ""}
          {introvoice == "voice" ?
            ProcessedVoices.map(self =>
              <div key={self.id} className="infoholder lowerspace ldblue">
                <div className="infonameholder clicky" onClick={() => onclick(self)}>
                  {self.text != undefined ?
                    <div className="subpassiveflair voiceline" >{ReplacerCharacter(` ► ` + self.text)}</div>
                    : self.jptext != undefined ?
                      <div className="subpassiveflair voiceline" >{ReplacerCharacter(` ► ` + self.jptext)}</div>
                      : ""}
                  {self.jptext != undefined ?
                    self.text == undefined ? "" :
                      <div className="abilityJPname">{ReplacerCharacter(self.jptext)}</div>
                    : ""}
                </div>
              </div>
            ) : ""}
          {introvoice == "sticker" ?
            CharStickers.map(stickers =>
              <div key={stickers.StickerKey} className="buffunit">
                <div className="infoholder">
                  <div className="infonameholder clicky Nocolorbanner" onClick={() => onclickvoice(stickers.Voice)}>
                    {stickers.Name} ►
                    <div className="abilityJPname">{stickers.JPName}
                    </div>
                  </div>
                  <div className="infobase stamppadding Nocolorbase">
                    {stickers.IconGL == undefined ? null :
                      <img className="stampsicon clicky" onClick={() => onclickvoice(stickers.Voice)} style={stickers.BackgroundColor != null ? { background: `${stickers.BackgroundColor}` } : { background: null }} alt={stickers.Name} src={`https://dissidiacompendium.com/images/static/stamps/GL/${stickers.IconGL}${stickers.Animated == true ? ".gif" : ".png"}`}></img>}
                    {stickers.IconJP == undefined ? null :
                      <img className="stampsicon clicky" onClick={() => onclickvoice(stickers.Voice)} style={stickers.BackgroundColor != null ? { background: `${stickers.BackgroundColor}` } : { background: null }} alt={stickers.JPName} src={`https://dissidiacompendium.com/images/static/stamps/JP/${stickers.IconJP}${stickers.Animated == true ? ".gif" : ".png"}`}></img>}
                  </div>
                </div>
              </div>
            )
            : ""}
        </div>
      }
      {showraw == true ?
        <span className='react-json-view'>
          <ObjectView 
          options={
            {
              hideDataTypes: true,
              expandLevel: 1,
              displayEntriesMaxCount: 1,
            }
          }
          data={newmatch} 
          />
        </span>
        : ""}
      {showraw == true ?
      <span className='react-json-view'>
        <ObjectView 
          options={
            {
              hideDataTypes: true,
              expandLevel: 1
            }
          }
          data={all_dates} 
          />
      </span>
        : ""}
      {all_dates.length != 0 ?
        <div>
          <div className="glinfobanner Buffbanner">
            <div className="charglupdates">
              {CaliCon}{` ${newmatch.CharacterName}`}{"'s GL Releases"}
            </div>
          </div>
          <div className="glinfobase Buffbase">
            {all_dates.map((self, i) => (
              self.release == undefined ? "" :
                (new Date(self.date) < ct) == true ? "" :
                  self.temp == true ?
                    <div key={i} className="bufftypes_max">
                      {self.tag_array && self.tag_array.length == 0 ? "" :
                        self.tag_array.map((self_tag, ii) => (
                          <Link key={ii} to={`/characters/${newmatch.ShortName}/${self_tag.loc}`}>
                            <DefaultTippy content={self_tag.tip}>
                              <li className={`undertaga ${self_tag.tag}`}></li>
                            </DefaultTippy>
                          </Link>
                        ))}
                      <br />
                      {handledate(self.release)}
                    </div>
                    :
                    <div key={i} className="bufftypes_max">
                      {self.tag_array && self.tag_array.length == 0 ? "" :
                        self.tag_array.map((self_tag, ii) => (
                          <Link key={ii} to={`/characters/${newmatch.ShortName}/${self_tag.loc}`}>
                            <DefaultTippy content={self_tag.tip}>
                              <li className={`undertaga ${self_tag.tag}`}></li>
                            </DefaultTippy>
                          </Link>
                        ))}
                      <br />
                      <StartsInTimer expiryTimestamp={new Date(self.release)} />
                    </div>
            ))}
          </div>
        </div>
        : ""}
      {events.length != 0 ?
        <div onClick={() => seteventsexpand(!eventsexpand)} className="abilitybluesinglebutton clicky">
          <span className="eventspagebutton undertaga inlineblock autoleft" /><span className="charpageautotitle">Upcoming</span>{eventsexpand ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}
        </div>
        : ""}
      {eventsexpand == false || events.length == 0 ? "" :
        <div>
          <ul className="singleventholder nolist">
            <div className="similarbanner addbordertop addborderbottom">Featured Events</div>
            {events.map(events => (
              <EventListing
                key={events.eventindex}
                match={events}
                jptoggledata={jptoggledata}
              />
            ))}
          </ul>
          <span className="smallsubtext">*from current GL</span>
        </div>
      }
      <div onClick={() => sethelpexpand(!helpexpand)} className="abilitybluesinglebutton clicky">
        <span className="communitybutton undertaga inlineblock autoleft" />{"   "}<span className="charpageautotitle">Help</span>{helpexpand ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}
      </div>
      {helpexpand == false ? "" :
        <CommunityCharacterGuideFormatting
          key={newmatch.CharID}
          index={newmatch.CharID}
          CharGuideData={CharGuideData}
        />
      }
    </div>
  )
}