import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { EndsInTimer, StartsInTimer } from '../Timers'
import ReminderMaker from '../Events/ReminderMaker';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import TickUp from '../tickUp'
import ReplacerCharacter from '../ReplacerCharacter';
import { ObjectView } from 'react-object-view'
import format_cleaner from "../../processing/format_cleaner";
import MissionFormatting from "./MissionFormatting";

export default function PanelFormatting({
    panel,
    ver
}){

    const [mission_select, setmission_select] = useStateIfMounted([])
    
    const currenttime = new Date().getTime();
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const caldata = {
        name: panel.title,
        details: `Opera Omnia ${ver == "JP" ? "JP Panel " : "GL Panel "}` + panel.title,
        startsAt: panel.term_from_date,
        endsAt: panel.reward_receive_date,
    }

    const start_date = new Date(panel.term_from_date)
    const end_date = new Date(panel.reward_receive_date)

    function calculateTimeDifference(time1, time2, time3) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const millisecondsPerHour = 60 * 60 * 1000; // Number of milliseconds in an hour
      
        const diffMilliseconds = Math.abs(time1 - time2); // Calculate the absolute difference in milliseconds
      
        if (diffMilliseconds >= millisecondsPerDay) {
          const days = Math.ceil(diffMilliseconds / millisecondsPerDay); // Calculate the number of days and round up
          if(time2 > 1900000000000){
            return <div className="panel-time">{"∞ left"}</div>
          } else {
            return <div className="panel-time">{`${days}d left`}</div>
          }
        } else {
          const hours = Math.ceil(diffMilliseconds / millisecondsPerHour); // Calculate the number of hours and round up
          if(hours > 0){
            return <div className="panel-time">{`${hours}h left`}</div>
          } else {
            const diffMilliseconds2 = Math.abs(time2 - time3);
            if (diffMilliseconds2 >= millisecondsPerDay) {
                const days2 = Math.ceil(diffMilliseconds2 / millisecondsPerDay); 
                return <div className="panel-time">{`${days2}d left`}</div>
            } else {
                const hours2 = Math.ceil(diffMilliseconds2 / millisecondsPerDay); 
                return <div className="panel-time color-grey">{`${hours2}h left`}</div>
            }
          }
          
        }
    }

    const missions_clears = panel.missions && panel.missions.filter(mis=>mis.panel_x == -1) || []
    const all_clear = panel.missions && panel.missions.filter(mis=>ver == "JP" ? mis.trans == "All Cleared Reward" : mis.description == "All Cleared Reward") || []
    if(all_clear[0] != undefined){
        missions_clears.pop()
        missions_clears.unshift(all_clear[0])
    }
    const spot1_1 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 1 && mis.panel_y == 1)[0] || {}
    const spot1_2 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 2 && mis.panel_y == 1)[0] || {}
    const spot1_3 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 3 && mis.panel_y == 1)[0] || {}
    const spot2_1 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 1 && mis.panel_y == 2)[0] || {}
    const spot2_2 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 2 && mis.panel_y == 2)[0] || {}
    const spot2_3 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 3 && mis.panel_y == 2)[0] || {}
    const spot3_1 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 1 && mis.panel_y == 3)[0] || {}
    const spot3_2 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 2 && mis.panel_y == 3)[0] || {}
    const spot3_3 = panel.missions && panel.missions.filter(mis=>mis.panel_x == 3 && mis.panel_y == 3)[0] || {}

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

    const pre_filter = (text)=>{
        if( text == undefined){
            return ""
        }
        if(typeof text != "string"){
            return `${text}`
        }
        let replacement = text
        replacement = replacement && replacement.replace(/\[/gm, "")
        replacement = replacement && replacement.replace(/\]/gm, "")
        replacement = replacement && replacement.replace(/\n/gm, " ")
        replacement = replacement && replacement.replace(/\\n/gm, " ")
        return replacement
    }

    const ArrayChest = {
        bg: "grey",
        image: "item/ArrayChest.png",
        item_id: 99,
        type: 0,
        item_num: 1,
        name: "Multiple rewards"
    }

    const amount = (num)=>{
        if(num> 1000){
            return `${num/1000}k `
        } else {
            return num
        }
    }

    const missionselect = (missions) => {
        if (mission_select[0] && mission_select[0].mission_id == missions[0].mission_id) {
            setmission_select([])
        } else {
            setmission_select(missions)
        }
    }

    const make_reward = (item, loc, master) => {
        if(item == undefined){
            return ("")
        }
        if(item.bg != undefined){
            return (
                <span onClick={() => missionselect([master])} className="panel-reward-holder">
                <img className={`panel-reward reward_${loc}`} src={`https://dissidiacompendium.com/images/static/items/bg/${item.bg}.png`} alt={"reward-bg"}/>
                <div className={`panel-item item${item.star != undefined ? "_s": ""}_${loc}`}>
                    <img className={`panel-item-icon`} src={`https://dissidiacompendium.com/images/static/${item.image}`} alt={"reward-item"}/>
                </div>
                {item.star != undefined ?
                    <img className={`panel-star star_${loc}`} src={`https://dissidiacompendium.com/images/static/items/stars/${item.star}.png`} alt={"reward-item"}/>
                :""}
                <div className={`panel-amount amount_${loc}`}>{`${item.points == true ? `${amount(item.item_num)}pt` : `x${amount(item.item_num)}`}`}</div>
                </span>
            )
        } else {
            return (
                <span onClick={() => missionselect([master])} className="panel-reward-holder">
                <div className={`panel-reward reward_${loc}`}>
                    <img className={`panel-item-icon`} src={`https://dissidiacompendium.com/images/static/${item.image}`} alt={"reward-item"}/>
                </div>
                {item.item_num != 1?
                <div className={`panel-amount amount_${loc}`}>{`${item.points == true ? `${amount(item.item_num)}pt` : `x${amount(item.item_num)}`}`}</div>
                :""}
                </span>
            )
        }
    }

    return (
        <>
            <div className="eventtitlebanner">
                <h3 className="atevents">{panel.title}</h3>
                {currenttime <= panel.term_from_date && panel.reward_receive_date < 1900000000000  ? (
                    <LazyLoadComponent>
                        <StartsInTimer expiryTimestamp={start_date} JPFlag={ver == "JP" ? true : false} />
                    </LazyLoadComponent>
                ) : 
                panel.reward_receive_date> 1900000000000 ? (
                    <LazyLoadComponent>
                        <div className="tickholder greencolor">
                            <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[start_date.getMonth()]} /><TickUp value={ordinal(start_date.getDate())} /><TickUp value={start_date.getFullYear()} />
                        </div>
                    </LazyLoadComponent>
                ) : (
                    <LazyLoadComponent>
                        <EndsInTimer expiryTimestamp={end_date} JPFlag={ver == "JP" ? true : false} />
                    </LazyLoadComponent>
                )
                }
            </div>
            <div className="znone">
                <div className="featuredbanner">
                    <ReminderMaker eventdata={caldata}>
                        Reminder
                    </ReminderMaker>
                </div>
            </div>
            <div className="eventholder">
                <div className="panel_dyn">
                    <img className={`withshadow panel-bg`} src={'https://dissidiacompendium.com/images/static/items/panels/bg.png'} alt={"bg"} />
                    <img className={`panel-header`} src={'https://dissidiacompendium.com/images/static/items/panels/header.png'} alt={"header"} />
                    <div className="panel-title" onClick={showmeraw}>{panel.title}</div>
                    <div className="panel-page">{panel.page}</div>
                    {calculateTimeDifference(currenttime,panel.reward_receive_date,panel.term_to_date)}
                    <div onClick={() => missionselect(missions_clears)} className="panel-clear-bn">Clears</div>

                    <img className="panel-bg_1_3" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_1_3"} />
                    <img className="panel-bg_1_2" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_1_2"} />
                    <img className="panel-bg_1_1" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_1_1"} />
                    
                    {make_reward(spot1_1 && spot1_1.rewards && spot1_1.rewards.length > 1 ? ArrayChest : spot1_1.rewards && spot1_1.rewards[0] ,"1_1",spot1_1)}
                    {make_reward(spot1_2 && spot1_2.rewards && spot1_2.rewards.length > 1 ? ArrayChest : spot1_2.rewards && spot1_2.rewards[0] ,"1_2",spot1_2)}
                    {make_reward(spot1_3 && spot1_3.rewards && spot1_3.rewards.length > 1 ? ArrayChest : spot1_3.rewards && spot1_3.rewards[0] ,"1_3",spot1_3)}

                    <div onClick={() => missionselect([spot1_1])} className="panel-box   box_1_1">{ReplacerCharacter(format_cleaner(pre_filter(spot1_1[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_1_1">{ReplacerCharacter(format_cleaner(pre_filter(spot1_1.total)))}</div>
                    <div onClick={() => missionselect([spot1_2])} className="panel-box   box_1_2">{ReplacerCharacter(format_cleaner(pre_filter(spot1_2[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_1_2">{ReplacerCharacter(format_cleaner(pre_filter(spot1_2.total)))}</div>
                    <div onClick={() => missionselect([spot1_3])} className="panel-box   box_1_3">{ReplacerCharacter(format_cleaner(pre_filter(spot1_3[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_1_3">{ReplacerCharacter(format_cleaner(pre_filter(spot1_3.total)))}</div>

                    <img className="panel-bg_2_3" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_2_3"} />
                    <img className="panel-bg_2_2" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_2_2"} />
                    <img className="panel-bg_2_1" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_2_1"} />

                    {make_reward(spot2_1 && spot2_1.rewards && spot2_1.rewards.length > 1 ? ArrayChest : spot2_1.rewards && spot2_1.rewards[0] ,"2_1",spot2_1)}
                    {make_reward(spot2_2 && spot2_2.rewards && spot2_2.rewards.length > 1 ? ArrayChest : spot2_2.rewards && spot2_2.rewards[0] ,"2_2",spot2_2)}
                    {make_reward(spot2_3 && spot2_3.rewards && spot2_3.rewards.length > 1 ? ArrayChest : spot2_3.rewards && spot2_3.rewards[0] ,"2_3",spot2_3)}

                    <div onClick={() => missionselect([spot2_1])} className="panel-box   box_2_1">{ReplacerCharacter(format_cleaner(pre_filter(spot2_1[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_2_1">{ReplacerCharacter(format_cleaner(pre_filter(spot2_1.total)))}</div>
                    <div onClick={() => missionselect([spot2_2])} className="panel-box   box_2_2">{ReplacerCharacter(format_cleaner(pre_filter(spot2_2[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_2_2">{ReplacerCharacter(format_cleaner(pre_filter(spot2_2.total)))}</div>
                    <div onClick={() => missionselect([spot2_3])} className="panel-box   box_2_3">{ReplacerCharacter(format_cleaner(pre_filter(spot2_3[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_2_3">{ReplacerCharacter(format_cleaner(pre_filter(spot2_3.total)))}</div>

                    <img className="panel-bg_3_3" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_3_3"} />
                    <img className="panel-bg_3_2" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_3_2"} />
                    <img className="panel-bg_3_1" src={'https://dissidiacompendium.com/images/static/items/panels/board.png'} alt={"bg_3_1"} />

                    {make_reward(spot3_1 && spot3_1.rewards && spot3_1.rewards.length > 1 ? ArrayChest : spot3_1.rewards && spot3_1.rewards[0] ,"3_1",spot3_1)}
                    {make_reward(spot3_2 && spot3_2.rewards && spot3_2.rewards.length > 1 ? ArrayChest : spot3_2.rewards && spot3_2.rewards[0] ,"3_2",spot3_2)}
                    {make_reward(spot3_3 && spot3_3.rewards && spot3_3.rewards.length > 1 ? ArrayChest : spot3_3.rewards && spot3_3.rewards[0] ,"3_3",spot3_3)}

                    <div onClick={() => missionselect([spot3_1])} className="panel-box   box_3_1">{ReplacerCharacter(format_cleaner(pre_filter(spot3_1[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_3_1">{ReplacerCharacter(format_cleaner(pre_filter(spot3_1.total)))}</div>
                    <div onClick={() => missionselect([spot3_2])} className="panel-box   box_3_2">{ReplacerCharacter(format_cleaner(pre_filter(spot3_2[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_3_2">{ReplacerCharacter(format_cleaner(pre_filter(spot3_2.total)))}</div>
                    <div onClick={() => missionselect([spot3_3])} className="panel-box   box_3_3">{ReplacerCharacter(format_cleaner(pre_filter(spot3_3[`${ver == "JP" ? "trans" : "description"}`])))}</div>
                    <div className="total-box total_3_3">{ReplacerCharacter(format_cleaner(pre_filter(spot3_3.total)))}</div>

                </div>
            </div>
            {mission_select.length != 0 ?
                mission_select.map((self,i)=>{
                    return(
                    <MissionFormatting
                    key={`${self.mission_id}-${i}`}
                    solo={false}
                    mission={self}
                    ver={ver}
                    />
                    )
                })
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
                data={panel} />
                </span>
            : ""}
</>
    )
}