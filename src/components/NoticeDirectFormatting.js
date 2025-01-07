import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateIfMounted } from "use-state-if-mounted";
import {AiFillEdit} from 'react-icons/ai'
import {FaCheck} from 'react-icons/fa'
import {FaTrashAlt} from 'react-icons/fa'
import AutosizeInput from './AutosizeInput';
import MD5 from '../processing/MD5';

export default function NoticeDirectFormatting ({ match, ver_ }) {

    const ver = ver_.toUpperCase()
    const urlloc = "https://game.dissidiaff-oo.com/api/info/information_detail.html?info_id="
    const [text, settext] = useState(match.info_title_gl);
    const [returnmsg, setreturnmsg] = useStateIfMounted();

    useEffect(()=>{
        if(ver == "JP"){
            settext(match.info_title_gl)
        }
        // eslint-disable-next-line
    },[match])

    const [editable, seteditable] = useStateIfMounted(false)

    const trashedit=()=>{
        seteditable(false)
        settext(match.info_title_gl ? match.info_title_gl : "")
    }

    const submitedit=()=>{
        const command = MD5("update_notice_jp")
        const request ={
            data: command,
            id: match.info_id,
            trans: text
        }
        axios.post(`https://datadirect.dissidiacompendium.com/put`, request, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setreturnmsg(response)
            }).catch(function (err) {
                console.log(err)
                setreturnmsg({success: false,message:"axios error"})
            })
        seteditable(false)
    }

    const notice_text ={
        "1": "Important",
        "2": "Update",
        "4": "Maintenance",
        "6": "Campaigns",
        "8": "Events",
        "9": "Notices",
        "10": "Draws",
    }
    
    return (
        <div className="notice_holder clicky">
        <div className='notice_banner'>
            <div className='notice_icon' style={{backgroundImage: `url("./images/static/icons/banners/notice/${match.info_category_id}.png")`}}>
                {notice_text[match.info_category_id]}
            </div>
            {ver == "JP" ?
                editable ?
                <span>
                <AutosizeInput     
                    inputStyle={{
                        background: "none",
                        color: "white",
                        border: "none",
                        textAlign: "center",
                        fontSize: "calc( var(--column-width) / 100 )",
                        fontWeight: "bold",
                        textShadow: "-1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000",
                        outline: "none",
                        minWidth: "2em",
                        display: "inline-block",
                        position: "relative",
                        whiteSpace: "pre",
                        padding: "0px"
                    }}
                    autoCapitalize="none"
                    autoComplete="off" 
                    autoCorrect="off" 
                    spellCheck="false"
                    tabIndex="0"
                    type="text" 
                    id="search2"
                    aria-autocomplete="list"
                    aria-expanded="false"
                    aria-haspopup="true"
                    role="combobox"
                    onChange={e => settext(e.target.value)}
                    value={text}
                    />
                    <FaCheck onClick={()=>submitedit()} size="22px" className='editicon'/>{" "}<FaTrashAlt onClick={()=>trashedit()} size="20px" className='editicon'/>
                    </span>
                :
                <><a rel="noreferrer noopener" target="_blank" href={urlloc+match.info_id} className='notice_text unique underline'>{returnmsg != undefined ? text : match.info_title_gl}</a><AiFillEdit onClick={()=>seteditable(true)} size="22px" className='editicon'/></>
                :
                <a rel="noreferrer noopener" target="_blank" href={urlloc+match.info_id} className='notice_text unique underline'>{match.info_title}{" - "}{new Date(match.start_at).getMonth()}/{new Date(match.start_at).getDate()}</a>
            }
            
        </div>
        
        {ver == "JP" ?
            <div style={{textAlign:"left",marginLeft:"5px"}} className='abilityJPname'>{new Date(match.start_at).getMonth()}/{new Date(match.start_at).getDate()}{" - "}{match.info_title}</div>
        :
            ""
        }
        {returnmsg != undefined ?
            <div className={`${returnmsg.success ? "greencolor" : "redcolor"}`}>
                {returnmsg.message}
            </div>
        :""}
    </div>
    )
    

}