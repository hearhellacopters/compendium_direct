import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJukeBox } from '../../redux/ducks/jukebox';
import { setMusicKey } from '../../redux/ducks/playindex'
import { setPlaying } from '../../redux/ducks/playing'
import DefaultTippy from '../TippyDefaults.js';
import { RiMusic2Fill } from 'react-icons/ri';
import {BsFillImageFill} from 'react-icons/bs';
import StoryFormatting from "./StoryFormatting";
import { Link } from "react-router-dom";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
import axios from 'axios';

function TalkFormatting({
    ver,
    talk_index,
    talk,
    scrollPosition,
    solo
}){

    const [changebg,setchangebg] = useState(talk.field_map != undefined ? window.localStorage.getItem("bg") == "true" ? `https://dissidiacompendium.com/images/static/FieldMap/${talk.field_map}.png` : "" : "")

    useEffect(() => {
        if (typeof (Storage) !== "undefined") {
          // create
          if (window.localStorage.getItem("bg") == null) {
            window.localStorage.setItem('bg', "true")
          }
        } else {
          // No web storage Support.
        }
        // eslint-disable-next-line
      }, [])

    const dispatch = useDispatch();

    const [bg,setbg] =  useState(window.localStorage.getItem("bg") == "true")

    const ProcessedMusic = useSelector((state) =>
        state.jukebox.jukebox
    );

    const [bgmname,setbgmname] = useState("")
    const [bgnumber,setbgnumber] = useState(1)
    const [active, setactive] = useState({})
    const [talk_data, settalk_data] = useState([])
    const [bad_ver, setbad_ver] = useState()

    useEffect(() => {
        settalk_data([])
        setactive({})
    },[ver])

    const make_active =(data)=>{
        if(active.id == data.id){
            setactive({})
        } else {
            settalk_data([])
            if(data && data[ver] == true){
                axios.get(`https://www.dissidiacompendium.com/data/talk/${ver}/${data.battle_id != undefined ? "battle_event_"+data.battle_id.toString().padStart(3, '0') : "talk_event_"+data.talk_id.toString().padStart(3, '0')}.json`, { 'muteHttpExceptions': true }).then((res) => {
                    const response = res.data;
                    setactive(data)
                    settalk_data(response)
                }).catch(function (err) {
                    console.log(err)
                })
            } else {
                setactive(data)
                setbad_ver(true)
            }
        }
    }

    useEffect(() => {
        if(talk.bgm_id != undefined){
            let mounted = true
            if (mounted && ProcessedMusic == undefined) {
                dispatch(getJukeBox());
            }
            if(ProcessedMusic != undefined){
                const music_pull = ProcessedMusic.filter(self=> self.MusicKey == talk.bgm_id)
                if(music_pull[0] != undefined){
                    setbgmname(music_pull[0].Label)
                }
            }
            return function cleanup() {
                mounted = false
            }
        }  
    }, [dispatch, talk, ProcessedMusic]);
    
    const [switchimg,setswitchimg] = useState("")

    const changebutton=(bgnum)=>{
        setbg(true)
        window.localStorage.setItem('bg', true)
        setswitchimg("imgchange")
        setTimeout(() => {
            setswitchimg("")
            if(talk.image_amnt != undefined){
                const bgimage = `https://dissidiacompendium.com/images/static/FieldMap/${talk.field_map}${bgnum==1?"":talk.image_amnt == bgnum-1?"":bgnum-1}.png`
                setchangebg(bgimage)
                if(bgnumber == talk.image_amnt){
                    setbgnumber(1)
                } else {
                    setbgnumber(bgnumber+1);
                }
            } else {
                setchangebg(`https://dissidiacompendium.com/images/static/FieldMap/${talk.field_map}.png`)
            }
        }, 300);
    }

    const bgtoggle=()=>{
        if(bg){
            setbg(false)
            setchangebg(undefined)
            window.localStorage.setItem('bg', "false")
        } else {
            setbg(true)
            setchangebg(talk.field_map != undefined ? `https://dissidiacompendium.com/images/static/FieldMap/${talk.field_map}.png` : "")
            window.localStorage.setItem('bg', "true")
        }
    }

    const handleselectmusic = (e) => {
        dispatch(setPlaying(false))
        dispatch(setMusicKey(e))
        dispatch(setPlaying(true))
    }

    const make_image = (data) =>{
        var image = `https://dissidiacompendium.com/images/static/banners/${ver.toLowerCase()}/event/eventtitle`
        if(data[`${ver}_banner`] != undefined && data[`${ver}_banner`][0]!= undefined){
            image = image + data[`${ver}_banner`][0] + "out.png"
        } else {
            image = image + "temp1out.png"
        }
        return(
                <Link to={`/events/${data.eventindex}`}>
                <LazyLoadImage
                key={`${data.or}_${data.eventindex}`}
                scrollPosition={scrollPosition}
                alt={data.name}
                placeholder={<div className='eventimage withshadow showlink'/>}
                className='eventimage withshadow showlink'
                src={image}
                effect="opacity"
                />
                </Link>
            )
    }

    return (
        <>
        
        <div className={`talk-bg ${switchimg}`} style={{"--image":`url(${changebg})`,backgroundColor:solo == true ?"#263252":""}}>
            <div className="above">
            {solo == true ?
            <>
                <h1>{talk.name}<div className="abilityJPname">{talk.jpname}</div></h1>                
            </>
            :""}
            <div className="transp"><span className="unline clicky" onClick={()=>bgtoggle()}><BsFillImageFill className="bgm-icon"/>{` ${bg?"ON":"OFF"}`}</span>
                {bg && talk.field_map != undefined && talk.image_amnt != undefined ?
                   <>{": "}<span className="unline clicky" onClick={()=>changebutton(bgnumber+1)}>{`Map ${bgnumber}`}</span></>
                :""}
            </div>
            {talk.bgm_id != undefined ?
                <div className="bgm_info" onClick={()=>handleselectmusic(talk.bgm_id)}><RiMusic2Fill className="bgm-icon"/>{": "}{bgmname}</div>
            :""}
            {solo == true ? 
                <div style={{display:"flex",justifyContent:"center",paddingBottom:".5rem"}}>
                    <DefaultTippy content={"to event"}>
                    {make_image(talk)}
                    </DefaultTippy>
                </div>
            :""}
            {talk.scripts != undefined ?
                talk.scripts.map((self,i)=>(
                    <StoryFormatting
                    key={`${i}-${talk.id}`}
                    talk={self}
                    ver={ver}
                    talk_index={talk_index}
                    handleselectmusic={handleselectmusic}
                    make_active={make_active}
                    bad_ver={bad_ver}
                    active={active}
                    talk_data={talk_data}
                    ProcessedMusic={ProcessedMusic}
                    />
                ))
            :""}
            </div>
        </div>
        </>
    )
}

export default trackWindowScroll(TalkFormatting)