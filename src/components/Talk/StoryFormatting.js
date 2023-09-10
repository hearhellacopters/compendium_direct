import React, {useState, useEffect} from "react";
import ReplacerCharacter from "../ReplacerCharacter";
import format_cleaner from "../../processing/format_cleaner";
import DefaultTippy from '../TippyDefaults.js';
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue } from '../../redux/ducks/jptoggle.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams.js'
import ScrollHere from "../ScrollHere";
import TalkUintFormatting from "./TalkUnitFormatting";
import { ObjectView } from 'react-object-view'
import OhNo from "../OhNo";

export default function StoryFormatting({
    talk,
    ver,
    talk_index,
    make_active,
    active,
    handleselectmusic,
    bad_ver,
    talk_data,
    ProcessedMusic
}){

    const dispatch = useDispatch();

    const [type,settype] = useState(talk.battle_id == undefined ? "talk" : "battle")

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

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    const jponlybutton = () => {
        if (ver == "GL") {
            dispatch(setTrue())
            setJPSearch("true")
        } else {
            dispatch(setFalse())
            setJPSearch("")
        }
    };

    const volume = useSelector((state) =>
        state.volume.volume
    );

    const [playingaudio, setplayingaudio] = useState(false)

    const soundfx = (sfx) => {
        if(playingaudio != true){
          try {
            const myAudioElement = new Audio(sfx)
            myAudioElement.volume = (volume * 1.5) % 1
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

    function joinWithCommasAndAnd(arr) {
        if (arr.length === 0) {
          return "";
        } else if (arr.length === 1) {
          return arr[0];
        } else if (arr.length === 2) {
          return arr.join(" and ");
        } else {
          const lastItem = arr.pop(); // Remove the last item
          return arr.join(", ") + " and " + lastItem;
        }
      }

    const make_includes = (char_ids)=>{
        if(char_ids.length !=0 ){
            const arr_char = []
            char_ids.forEach(char_id=>{
                const pull = Object.values(talk_index.unit_id).filter(self2=>self2.char_id == char_id)
                if(pull.length != 0){
                    arr_char.push(pull[0].name)
                }
            })
            if(arr_char.length != 0){
                return(
                    <><ScrollHere id="scrollhere"/><div className="single_info">This scene includes {joinWithCommasAndAnd(arr_char)}</div>--</>
                )
            } else {
                return "" 
            }
        } else {
            return ""
        }
    }

    if(active.id == talk.id){
        return(
            <>
            <div
            className="talk_bar_holder talk_click"
            onClick={()=>make_active(talk)}
            >
                
                <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_l.png)","--width":"33px"}} className="talk_storybar_l"/>
                <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_c.png)"}}  className="talk_storybar_c">
                {ReplacerCharacter(`${format_cleaner(talk.battle_id != undefined?"\bTa":"\bTb")}`)}&nbsp;{ReplacerCharacter(talk.name)}
                </div>
                <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_r.png)","--width":"33px"}}  className="talk_storybar_r"/>
            </div>
            {talk.jpname != undefined ?
                <div
                onClick={showmeraw}
                className="talk_bar_holder non_talk" style={{marginBottom:"5px"}}
                >
                    <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_l.png)","--width":"33px"}} className="talk_storybar_l"/>
                    <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_c.png)"}}  className="talk_storybar_c">
                    {ReplacerCharacter(`${format_cleaner(talk.battle_id != undefined?"\bTa":"\bTb")}`)}&nbsp;{ReplacerCharacter(talk.jpname)}
                    </div>
                    <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_r.png)","--width":"33px"}}  className="talk_storybar_r"/>
                </div>
            :""}
            {talk.char_ids != undefined ?
                make_includes(talk.char_ids)
            :""}
            {bad_ver == true ?
                <OhNo
                random={5}
                message1={"No results found"}
                message={<span>Try changing version? <DefaultTippy content={`${ver == "JP" ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                    <span onClick={jponlybutton} className={`${ver =="JP" ? "glflage smalleventbutton" : "jpflage jpsmallinactive smalleventbutton"}`} />
                </DefaultTippy>
                </span>}
                />
            :
            talk_data.length != 0?
            talk_data.map((self,i)=>(
                <TalkUintFormatting
                    key={`${talk.id}-${i}`}
                    talk_unit={self}
                    type={type}
                    talk_index={talk_index}
                    soundfx={soundfx}
                    ProcessedMusic={ProcessedMusic}
                    handleselectmusic={handleselectmusic}
                />
            ))
            :""}
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
                data={{talk: talk, talk_data: talk_data}} />
                </span>
            : ""}
            </>
        )
    } else {
        return(
            <div
            className="talk_bar_holder talk_click"
            onClick={()=>make_active(talk)}
            >
                <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_l.png)","--width":"33px"}} className="talk_storybar_l"/>
                <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_c.png)"}}  className="talk_storybar_c">
                {ReplacerCharacter(`${format_cleaner(talk.battle_id != undefined?"\bTa":"\bTb")}`)}&nbsp;{ReplacerCharacter(talk.name)}
                </div>
                <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/storybar_r.png)","--width":"33px"}}  className="talk_storybar_r"/>
            </div>
        )
    }
    
}