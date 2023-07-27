import React, {useState, useEffect} from "react";
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft } from 'react-icons/im';
import { useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import format_cleaner from "../../processing/format_cleaner";
import ReplacerCharacter from "../ReplacerCharacter";
import Tippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'

function MissionFormatting({
    mission,
    solo, //for time left and width
    no_field,
    costs,
    ver,
    scrollPosition 
}){

    const {
        description, 
        trans, 
        opt, 
        rewards, 
        published_date, 
        reward_receive_date, 
        close_date,
        loc,
        field,
        total,
        stock,
        cost
    } = mission

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const desc = ver == "JP" ? trans && trans : description && description || ""

    const only_one = rewards && (rewards.length == 1 && rewards[0] != undefined) ? true : false

    const first = rewards && rewards[0] || {}

    const bg_color={
        0: "holder",
        1: "holder mis_purple",
        2: "holder mis_gold"
    }

    const currenttime = new Date().getTime();

    function timeDiff(time1, time2) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const millisecondsPerHour = 60 * 60 * 1000; // Number of milliseconds in an hour
        const diffMilliseconds = Math.abs(time1 - time2); // Calculate the absolute difference in milliseconds
        if (diffMilliseconds >= millisecondsPerDay) {
            const days = Math.ceil(diffMilliseconds / millisecondsPerDay); // Calculate the number of days and round up
            if(time2 > 1900000000000){
                return ""
            } else {
                return `Left: ${days}d `
            }
        } else {
            const hours = Math.ceil(diffMilliseconds / millisecondsPerHour); // Calculate the number of hours and round up
            if(hours < 0){
                return `Left: Ended`
            } else {
                return `Left: ${hours}h`
            }
        }
    }

    const time_left = close_date && timeDiff(currenttime,close_date) || ""

    const color = desc == "All Cleared Reward" ? 2 : opt && opt.bg || 0

    const amount = (num)=>{
        if(num> 1000){
            return `${num/1000}k `
        } else {
            return num
        }
    }

    const [playingaudio, setplayingaudio] = useState(false)

    const volume = useSelector((state) =>
        state.volume.volume
    );

    const playvoice =(item)=>{
        if(playingaudio != true && item.voice != undefined){
            try {
                const myAudioElement = new Audio(`https://dissidiacompendium.com/images/static/${item.voice}`)
                myAudioElement.volume = volume
                myAudioElement.style.display = "none"
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
                console.log(error)
                setplayingaudio(false)
            }
        }
    }

    const make_reward = (item, select, key) => {
        if(item == undefined){
            return ("")
        }
        if(item.bg != undefined){
            return (
                <Tippy key={key} content={item.name}>
                    <div style={{cursor:item.voice!=undefined?"pointer":""}} onClick={()=>playvoice(item)} className={select == false ? `reward-holder ${costs != true ? "floater":"float-left"}` : `reward-list-item`}>                
                    {item.star != undefined ?
                        <span className={`reward_star-holder`}>
                            <img className={`reward_star`} src={`https://dissidiacompendium.com/images/static/items/stars/${item.star}.png`} alt={"reward-item"}/>
                        </span>
                    :""}
                    {item.pass == true ?
                        <Tippy content={"Mog Pass Reward"}>
                            <span className={`reward_pass-holder`}>
                                <img className={`reward_pass`} src={`https://dissidiacompendium.com/images/static/items/PremiumPass.png`} alt={"reward-item"}/>
                            </span>
                        </Tippy>
                    :""}
                    <img className={`reward_item`} src={`https://dissidiacompendium.com/images/static/${item.image}`} alt={"reward-item"}/>
                    <div className={`reward_amount`}>{`${item.points == true ? `${amount(item.item_num)}pt` : `x${amount(item.item_num)}`}`}</div>
                    <img className={`reward_bg`} src={`https://dissidiacompendium.com/images/static/items/bg/${item.bg}.png`} alt={"reward-bg"}/>
                    </div>
                </Tippy>
            )
        } else {
            return (
                <Tippy key={key} content={item.name}>
                    <div style={{cursor:item.voice!=undefined?"pointer":""}} onClick={()=>playvoice(item)} className={select == false ? `reward-holder ${costs != true ? "floater":"float-left"}` : "reward-list-item"}>
                    {item.pass == true ?
                        <span className={`reward_pass-holder`}>
                            <img className={`reward_pass`} src={`https://dissidiacompendium.com/images/static/items/PremiumPass.png`} alt={"reward-item"}/>
                        </span>
                    :""}
                    <img className={`reward_item-solo`} src={`https://dissidiacompendium.com/images/static/${item.image}`} alt={"reward-item"}/>
                    {item.item_num != 1?
                        <div className={`reward_amount`}>
                            {`${item.points == true ? `${amount(item.item_num)}pt` : `x${amount(item.item_num)}`}`}
                        </div>
                    :""}
                    </div>
                </Tippy>
            )
        }
    }

    function paginateArray(array, itemsPerPage, currentPage) {
        const totalPages = Math.ceil(array.length / itemsPerPage);
      
        // Ensure the currentPage is within the valid range
        currentPage = Math.min(Math.max(1, currentPage), totalPages);
      
        // Calculate the starting and ending indexes for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, array.length);
      
        // Get the items for the current page
        const currentPageItems = array.slice(startIndex, endIndex);
      
        return {
          currentPage: currentPage,
          totalPages: totalPages,
          currentPageItems: currentPageItems
        };
      }

    const [startinglimit, setstartinglimit] = useStateIfMounted(window.innerWidth <= 800 ? 12 : 24)
    const [currentpage, setcurrentpage] = useStateIfMounted(1)
    const [list_display, setlist_display] = useStateIfMounted()

    useEffect(()=>{
        if(costs == true){
            setlist_display(paginateArray(rewards,startinglimit,currentpage))
        }
    },[setcurrentpage,costs,rewards,setlist_display,startinglimit,currentpage])

    const page_change = (value)=>{
        if(currentpage + value >0 && currentpage + value <= list_display.totalPages){
            setcurrentpage(currentpage + value)
        }
    }

    if(costs == true){
        return (
           <>
            <div className={`shop_item_holder`}>
                {list_display && list_display.currentPageItems && list_display.currentPageItems.map((item,i)=>{
                    return (
                        <div key={i} className="shop-item">
                            <LazyLoadComponent
                            scrollPosition={scrollPosition}
                            >
                                {make_reward(item,false,item.mission_id)}
                                <div style={{marginTop:"5px"}} className="subtext unique">
                                    {item.cost.map(self=><div key={self.mission_id}><img  className={"inline-buff"} src={`https://dissidiacompendium.com/images/static/${self.image}`} />{` x${amount(self.item_num)}`}</div>)}
                                </div>
                                <span onClick={showmeraw} className="subtext">
                                    {`Stock: ${item.stock == 0 ? "∞":amount(item.stock)}`}
                                </span>
                            </LazyLoadComponent>
                        </div>
                    )
                })}
            </div>
            {list_display && list_display.totalPages > 1 ?
                    <div className="pageholder">
                        <div onClick={()=>page_change(-1)} className="previouspage">
                            <ImArrowLeft className="previousicon" />
                        </div>
                        <div className="unique">{`Page ${list_display.currentPage} of ${list_display.totalPages}`}</div>
                        <div onClick={()=>page_change(1)} className="previouspage">
                            <ImArrowRight className="nexticon" />
                        </div>
                    </div>
                :""}
            {showraw == true ?
                <span className='react-json-view'>
                <ObjectView 
                options={
                    {
                        hideDataTypes: true,
                        expandLevel: 1
                    }
                    }
                data={mission} />
                </span>
            : ""}
           </>
        )
    } else {
        return (
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className={`mission_${bg_color[color]} ${solo==true?"":"rewards_limit"}`} style={{minHeight:"100px"}}/>}
            >
            <div className={`mission_${bg_color[color]} ${solo==true?"":"rewards_limit"}`}>
                <div onClick={showmeraw} style={{textAlign:"left"}} className={`${only_one == true ? "reward_solo" : ""}`}>
                    <div className={`${only_one == true ? "mis_reward_title solo_reward_title" : "mis_reward_title"}`}>
                        <div>
                            {ReplacerCharacter(format_cleaner(desc))}
                        </div>
                        {ver =="GL"? "":
                        <div className="abilityJPname">{ReplacerCharacter(format_cleaner(description))}</div>
                        }
                    </div>
                    {only_one == false ? "" : make_reward(first,false)}
                </div>
                {solo == true && time_left != "" ? 
                    <div style={{textAlign:"left",padding:"3px"}} className="unique">
                        <hr style={{margin:"3px 0px 3px 0px"}}/>
                        {time_left}
                    </div>
                :""}
                {only_one != true ?
                    <div className="infonameholder newblue">
                        <div style={{textAlign:"left"}} className="unique ailmenttext">Rewards</div>
                        {only_one == true ? "" :
                        <ul className="reward_list">
                            {rewards && rewards.map((self,key)=>{
                            return (
                                make_reward(self,true, key)
                            )
                            })}
                        </ul>
                        }
                    </div>
                :""}
                {loc != undefined ?
                    <div style={{textAlign:"left",paddingLeft:"3px"}} className={`Buffsubbase2 ${solo==true?"":"rewards_limit"}`}>
                    <div className={`Buffsubbanner values`}>
                        {ReplacerCharacter("\\\\378\\\\ Location:")}
                    </div>
                    {loc}
                    </div> 
                :""}
                {field != undefined && no_field != true ?
                    <div style={{textAlign:"left",paddingLeft:"3px"}} className={`Buffsubbase2 ${solo==true?"":"rewards_limit"}`}>
                    <div className={`Buffsubbanner values`}>
                        {ReplacerCharacter("\\\\378\\\\ Area:")}
                    </div>
                    {field}
                    </div> 
                :""}
                {showraw == true ?
                    <span className='react-json-view'>
                    <ObjectView 
                    options={
                        {
                            hideDataTypes: true,
                            expandLevel: 1
                        }
                        }
                    data={mission} />
                    </span>
                : ""}
            </div>
            </LazyLoadComponent>
        )
    }
}

export default trackWindowScroll(MissionFormatting)