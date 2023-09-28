import React from "react";
import format_cleaner from "../../processing/format_cleaner";
import ReplacerCharacter from "../ReplacerCharacter";
import { MdRecordVoiceOver }from 'react-icons/md';
import { RiMusic2Fill } from 'react-icons/ri';
import { ImVolumeHigh } from 'react-icons/im'

const blend_index = {
    1: " opens eyes",
    2: " closes eyes",
    3: " opens eyes",
}

export default function TalkUintFormatting({
    talk_unit,
    type,
    talk_index,
    soundfx,
    handleselectmusic,
    ProcessedMusic,
}){

    var {action_type,
         battle_type,
         text, 
         name, 
         talk_effect,
         unit_id,
         stage_id,
         char_id,
         bgm, 
         emote, 
         talk_motion,
         stl_image,
         SE001_b,
         blend,
         EV_index,
         AV_index,
         ofthenext,
         choose_amnt,
         answer,
         bgmname
        } = talk_unit

        var display = false;

        if(emote != undefined && emote != -1 && emote != 0 ){
            emote = `https://dissidiacompendium.com/images/static/talk_emote/${emote}.png`
        } else {
            emote = undefined
        }

        if((EV_index != undefined && EV_index != -1) && (stl_image != undefined && stl_image != -1)){
            EV_index = `https://dissidiacompendium.com/images/static/talk/${stl_image}/${EV_index}.mp3`
        } else {
            EV_index = undefined
        }
        
        if(bgm != undefined && bgm != -1){
            const music_pull = ProcessedMusic.filter(self=> self.MusicKey == bgm)
            if(music_pull[0] != undefined){
                bgmname = music_pull[0].Label
                display = true;
            } else {
                bgm = undefined
            }
        } else {
            bgm = undefined
        }
        if(SE001_b != undefined && SE001_b != -1){
            SE001_b = `https://dissidiacompendium.com/images/static/talk/SE001_b/${SE001_b}.mp3`
            display = true
        } else {
            SE001_b = undefined
        }

        var stl,text_display,blend_display;

        if(stl_image != undefined && stl_image != -1){
            const check = talk_index.unit_id[stl_image]
            if(check && check.char_id != undefined){
                stl = `https://dissidiacompendium.com/images/static/talk/${stl_image}/stl_chara_event_${stl_image.toString().padStart(8, '0')}out.png`
            }
        }

        if(blend != undefined && blend != -1){
            blend_display = blend_index[blend]
            if(blend_display != undefined){
                display = true
            }
        } else {
            blend_display == undefined
        }

        if(text != ""){
            text_display = true
        }

        var stage,fade,unit,effect,action;

            switch (action_type) {
                case 2:
                    break;
                case 3:
                    fade = "FADE IN"
                    display = true 
                    break;
                case 4:
                    fade = "FADE OUT"
                    display = true 
                    break;
                case 5:
                    fade = "FADE IN"
                    display = true 
                    break;
                case 6:
                    fade = "FADE OUT"
                    display = true 
                    break;
                case 7:
                    break;
                case 9:
                    effect = undefined
                    break;
                case 10:
                    effect = undefined
                    break;
                case 12:
                    break;
                case 13:
                    break;
                case 14:
                    break;
                case 16:
                    effect = undefined
                    break;
                case 17:
                    if(talk_unit.SE001_b_id != undefined){
                        SE001_b = `https://dissidiacompendium.com/images/static/talk/SE001_b/${talk_unit.SE001_b_id}.mp3`
                        display = true
                    }
                    break;
                case 18:
                    break;
                case 19:
                    effect = undefined
                    break;
                case 20:
                    effect = {noun:"The area starts to shake",verb:"as the are shakes"}
                    break;
                case 21:
                    effect = undefined
                    break;
                case 23:
                    break;
                case 24:
                    action = "appears"
                    break;
                default:
                    break;
            }

            if(stage_id != undefined && stage_id != -1){
                stage = talk_index.stage[stage_id]
                if(stage != undefined){
                    display = true 
                }
            }

            if(unit_id != undefined){
                unit = talk_index.unit_id[unit_id] && talk_index.unit_id[unit_id].name
                if(unit != undefined && emote != undefined){
                    display = true
                }
                if(unit == undefined && emote != undefined){
                    emote = undefined
                }
            }

            if(talk_motion && talk_motion != -1){
                action = talk_index.talk_motion[talk_motion]
                if(action != undefined){
                    display = true
                }
            }

            if(talk_effect != -1 ){
                effect = talk_effect == -1 ? undefined : talk_index.talk_effect[talk_effect]
                if(effect != undefined){
                    display = true
                }
            } else {
                talk_effect = undefined
            }
            

            if(text_display == true){
                if(action != undefined){
                    //text and character acting
                } else if(effect != undefined){
                    unit = effect.noun
                    effect = undefined
                }
            } else {
                //stl == undefined
                if(unit != undefined){
                    //unit == defined but must have action effect, blend or emote
                } else if(effect != undefined){
                    //unit == undefined must be effect
                    unit = effect.noun
                    effect = undefined
                }
            }
            
    if(type == "talk"){
        if( text_display ||
            display == true 
            ){

            return (
                text_display == true?
                    <>
                        {bgm != undefined ?
                            <div className="bgm_info" onClick={()=>handleselectmusic(bgm)}><RiMusic2Fill className="bgm-icon"/>{": "}{bgm}</div>
                        :""}
                        <div className={`talk_unit ${name == "" ? "auto_height" :""}`}>
                            {stl != undefined ?
                                <div className="talk_pic_wrapper">
                                    {emote != undefined ?
                                        <span className="talk_emote" style={{"--image":`url(${emote})`}}/>
                                    :""}
                                    <div className="char_talk_face" style={{"--image":`url(${stl})`}}/>
                                    {EV_index != undefined ?
                                        <MdRecordVoiceOver onClick={()=>soundfx(EV_index)} className='speakicon'/>
                                    :""}
                                </div>
                            :""}
                            <div className="chatbox">
                                {name != "" ?
                                <div className={`cb_top ${stl!= undefined? "with_icon":""}`}>
                                    {ReplacerCharacter(format_cleaner(name))}
                                </div>
                                :""}
                                <div className={`cb_mid ${stl!= undefined? "with_icon_bottom":""}`}>
                                    {action != undefined?
                                        <div className="mid_action">{`(${action})`}</div>
                                    :""}
                                    <div>{ReplacerCharacter(format_cleaner(text))}</div>
                                </div>
                            </div>
                        </div>
                    </>
                :
                display == true?
                    <>
                        {fade != undefined ?
                            <div className="single_info">{fade}</div>
                        :""}
                        {stage != undefined?
                            <div className="single_info">{stage}</div>
                        :""}
                        {bgm != undefined ?
                            <div className="bgm_info" onClick={()=>handleselectmusic(bgm)}><RiMusic2Fill className="bgm-icon"/>{": "}{bgmname}</div>
                        :""}
                        {SE001_b != undefined ?
                            <div className="bgm_info" onClick={()=>soundfx(SE001_b)}><ImVolumeHigh className="bgm-icon"/>: SFX</div>
                        :""}
                        {unit != undefined ?
                            <span className={emote == undefined ? "left_info" : "single_info"}>
                                {`${unit != undefined ? unit :""}${action != undefined ? " "+action :""}${blend_display != undefined? blend_display :""}${effect!= undefined ? " "+effect.verb :""}${emote == undefined ? ". ":""}`}{emote != undefined ? <span className="emote_solo" style={{"--image":`url(${emote})`}}/>:""}
                            </span>
                        :""}
                    </>
                :""
            )

        } else {
            return (
                ""
            )
        }
    } else {

        switch (battle_type) {
            case 6:
                if(char_id != -1){
                    const check = Object.values(talk_index.unit_id).filter(self=>self.char_id == char_id)
                    if(check.length != 0 ){
                        fade = `${check[0].name} enters the battle.`
                        display = true
                    }
                }
                break;
            case 25:
                action = `Chooses ${choose_amnt} of the next ${ofthenext} displays`
                display = true
                break;
            case 27:
                action = `Chooses ${choose_amnt} of the next ${ofthenext} displays`
                display = true
                break;
            default:
                break;
        }

        if(AV_index != undefined && AV_index != -1){
            if(stl_image != undefined){
                var check = talk_index.unit_id[stl_image] 
                if(check != undefined && check.char_id != undefined){
                    if(check.char_id != true ){
                        check = check.name.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")
                        AV_index = `https://dissidiacompendium.com/images/static/characters/${check}/voice/${AV_index}.mp3`
                        display = true
                    } else if(check.char_id == true){
                        AV_index = `https://dissidiacompendium.com/images/static/talk/SE002_b/${AV_index}.mp3`

                    }
                }
            }
        } else {
            AV_index = undefined
        }

        if(text_display == true || display == true){
            return (
                text_display == true?
                    <>
                        {bgm != undefined ?
                            <div className="bgm_info" onClick={()=>handleselectmusic(bgm)}><RiMusic2Fill className="bgm-icon"/>{": "}{bgm}</div>
                        :""}
                        <div className="talk_unit">
                            {stl != undefined ?
                                <div className="talk_pic_wrapper">
                                    {emote != undefined ?
                                        <span className="talk_emote" style={{"--image":`url(${emote})`}}/>
                                    :""}
                                    <div className="char_talk_face" style={{"--image":`url(${stl})`}}/>
                                    {AV_index != undefined ?
                                        <MdRecordVoiceOver onClick={()=>soundfx(AV_index)} className='speakicon'/>
                                    :""}
                                </div>
                            :""}
                            <div className="chatbox">
                                <div className={`cb_top ${stl!= undefined? "with_icon":""}`}>
                                {ReplacerCharacter(format_cleaner(name))}
                                </div>
                                <div className={`cb_mid ${stl!= undefined? "with_icon_bottom":""}`}>
                                    {answer != undefined?
                                        <div className="mid_action">(Answer <span className="hide_answer">{answer.toString()}</span>)</div>
                                    :""}
                                    <div>{ReplacerCharacter(format_cleaner(text))}</div>
                                </div>
                            </div>
                        </div>
                    </>
                :
                display == true?
                    <>
                        {fade != undefined ?
                            <div className="single_info">{fade}</div>
                        :""}
                        {stage != undefined?
                            <div className="single_info">{stage}</div>
                        :""}
                        {bgm != undefined ?
                            <div className="bgm_info" onClick={()=>handleselectmusic(bgm)}><RiMusic2Fill className="bgm-icon"/>{": "}{bgmname}</div>
                        :""}
                        {SE001_b != undefined ?
                            <div className="bgm_info" onClick={()=>soundfx(SE001_b)}><ImVolumeHigh className="bgm-icon"/>: SFX</div>
                        :""}
                        {unit != undefined ?
                            <span className={emote == undefined ? "left_info" : "single_info"}>
                                {`${unit != undefined ? unit :""}${action != undefined ? " "+action :""}${blend_display != undefined? blend_display :""}${effect!= undefined ? " "+effect.verb :""}${emote == undefined ? ". ":""}`}{emote != undefined ? <span className="emote_solo" style={{"--image":`url(${emote})`}}/>:""}
                            </span>
                        :""}
                    </>
                :""
            )
        } else {
            return (
                ""
            )
        }
    }
}