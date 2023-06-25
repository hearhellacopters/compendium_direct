import React from 'react';

export default function NoticeFormatting({ 
    match, 
    jptoggledata 
}){

    const urlloc = "https://game.dissidiaff-oo.com/api/info/information_detail.html?info_id="

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
        <div key={match.info_id} className="notice_holder clicky">
        <a className='notice_banner' rel="noreferrer noopener" target="_blank" href={urlloc+match.info_id}>
            <div className='notice_icon whitecolor' style={{backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/banners/notice/${match.info_category_id}.png)`}}>
                {notice_text[match.info_category_id]}
            </div>
            {jptoggledata == true ?
                <span className='notice_text unique underline'>{match.info_title_gl}</span>
                :
                <span className='notice_text unique underline'>{match.info_title}{" - "}{new Date(match.start_at).getMonth()}/{new Date(match.start_at).getDate()}</span>
            }
            
        </a>
        
        {jptoggledata == true ?
            <div style={{textAlign:"left",marginLeft:"5px"}} className='abilityJPname'>{new Date(match.start_at).getMonth()}/{new Date(match.start_at).getDate()}{" - "}{match.info_title}</div>
        :
            ""
        }
    </div>
    )
    
}