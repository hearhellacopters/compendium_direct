import React from "react";
import replacer_buff from '../../../../processing/replacer_buffcontent'

const Passive_Total_Display =({
    match
})=>{
    return(
        <>
        {match.BONUSSTART != 0 ?
        <div>&nbsp;{replacer_buff(`+${match.BONUSSTART}% HP Damage Bonus at start of Force Time`)}</div>
        :""}
        {match.BONUSEND != 0 ?
        <div>&nbsp;{replacer_buff(`+${match.BONUSEND}% HP Damage Bonus at end of turn`)}</div>
        :""}
        
        {match.GAUGE != 0 ?
        <div>&nbsp;{replacer_buff(`- Increases Force Gauge by ${match.GAUGE}%`)}</div>
        :""}
        
        {match.BRVCAP != 0 && match.P_BRVCAP == 0 ?
        <div>&nbsp;{replacer_buff(`- BRV Damage Cap Up by ${match.BRVCAP}% (+${Math.round(100*match.BRVCAP).toLocaleString("en-US")})`)}</div>
        :""}
        {match.P_BRVCAP != 0 ?
        <div>&nbsp;{replacer_buff(`- Party BRV Damage Cap Up by ${match.P_BRVCAP}% (+${Math.round(100*match.P_BRVCAP).toLocaleString("en-US")}${match.BRVCAP != 0 ? `; ${match.P_BRVCAP+ match.BRVCAP}% self +${Math.round(100*(match.P_BRVCAP+match.BRVCAP)).toLocaleString("en-US")}`: ""})`)}</div>
        :""}

        {match.MAXCAP != 0 && match.P_MAXCAP == 0 ?
        <div>&nbsp;{replacer_buff(`- MAX BRV Cap Up by ${match.MAXCAP}% (+${Math.round(1000*match.MAXCAP).toLocaleString("en-US")})`)}</div>
        :""}
        {match.P_MAXCAP != 0 ?
        <div>&nbsp;{replacer_buff(`- Party MAX BRV Cap Up by ${match.P_MAXCAP}% (+${Math.round(1000*match.P_MAXCAP).toLocaleString("en-US")}${match.MAXCAP != 0 ? `; ${match.P_MAXCAP+ match.MAXCAP}% self +${Math.round(1000*(match.P_MAXCAP+match.MAXCAP)).toLocaleString("en-US")}`: ""})`)}</div>
        :""}

        {match.ATK != 0 && match.P_ATK == 0 ?
        <div>&nbsp;{replacer_buff(`- ATK Up by ${match.ATK}%`)}</div>
        :""}
        {match.P_ATK != 0 ?
        <div>&nbsp;{replacer_buff(`- Party ATK Up by ${match.P_ATK}%${match.ATK != 0 ? ` (self; ${match.P_ATK+match.ATK}%)`:""}`)}</div>
        :""}
        
        {match.MBRV != 0 && match.P_MBRV == 0?
        <div>&nbsp;{replacer_buff(`- MAX BRV Up by ${match.MBRV}%`)}</div>
        :""}
        {match.P_MBRV != 0 ?
        <div>&nbsp;{replacer_buff(`- Party MAX BRV Up by ${match.P_MBRV}%${match.MBRV != 0 ? ` (self; ${match.P_MBRV+match.MBRV}%)`:""}`)}</div>
        :""}
        
        {match.IBRV != 0 && match.P_IBRV == 0?
        <div>&nbsp;{replacer_buff(`- INT BRV Up by ${match.IBRV}%`)}</div>
        :""}
        {match.P_IBRV != 0 ?
        <div>&nbsp;{replacer_buff(`- Party INT BRV Up by ${match.P_IBRV}%${match.IBRV != 0 ? ` (self; ${match.P_IBRV+match.IBRV}%)`:""}`)}</div>
        :""}
        
        {match.DEF != 0 && match.P_DEF == 0?
        <div>&nbsp;{replacer_buff(`- DEF Up by ${match.DEF}%`)}</div>
        :""}
        {match.P_DEF != 0 ?
        <div>&nbsp;{replacer_buff(`- Party DEF Up by ${match.P_DEF}%${match.DEF != 0 ? ` (self; ${match.P_DEF+match.DEF}%)`:""}`)}</div>
        :""}

        {match.SPD != 0 && match.P_SPD == 0 ?
        <div>&nbsp;{replacer_buff(`- SPD Up by ${match.SPD}%`)}</div>
        :""}    
        {match.P_SPD != 0 ?
        <div>&nbsp;{replacer_buff(`- Party SPD Up by ${match.P_SPD}%${match.SPD != 0 ? ` (self; ${match.P_SPD+match.SPD}%)`:""}`)}</div>
        :""}

        {match.BRVDMG != 0 && match.P_BRVDMG == 0?
        <div>&nbsp;{replacer_buff(`- BRV Damage Up by ${match.BRVDMG}%`)}</div>
        :""} 
        {match.P_BRVDMG != 0 ?
        <div>&nbsp;{replacer_buff(`- Party BRV Damage Up by ${match.P_BRVDMG}%${match.BRVDMG != 0 ? ` (self; ${match.P_BRVDMG+match.BRVDMG}%)`:""}`)}</div>
        :""}
        
        {match.GAINS != 0 && match.P_GAINS == 0 ?
        <div>&nbsp;{replacer_buff(`- BRV Gains Up by ${match.GAINS}%`)}</div>
        :""}
        {match.P_GAINS != 0 ?
        <div>&nbsp;{replacer_buff(`- Party BRV Gains Up by ${match.P_GAINS}%${match.GAINS != 0 ? ` (self; ${match.P_GAINS+match.GAINS}%)`:""}`)}</div>
        :""}
        
        {match.S_OVER != 0 && match.P_S_OVER == 0 ?
        <div>&nbsp;{replacer_buff(`- Stolen MAX BRV Overflow Up by ${match.S_OVER}%`)}</div>
        :""}
        {match.P_S_OVER != 0 ?
        <div>&nbsp;{replacer_buff(`- Party Stolen MAX BRV Overflow Up by ${match.P_S_OVER}%${match.S_OVER != 0 ? ` (self; ${match.P_S_OVER+match.S_OVER}%)`:""}`)}</div>
        :""}
       
        {match.G_OVER != 0 && match.P_G_OVER == 0?
        <div>&nbsp;{replacer_buff(`- Gained MAX BRV Overflow Up by ${match.G_OVER}%`)}</div>
        :""}
        {match.P_G_OVER != 0 ?
        <div>&nbsp;{replacer_buff(`- Party Gained MAX BRV Overflow Up by ${match.P_G_OVER}%${match.G_OVER != 0 ? ` (self; ${match.P_G_OVER+match.G_OVER}%)`:""}`)}</div>
        :""}
        
        {match.RATE != 0 ?
        <div>&nbsp;{replacer_buff(`- Increases Turn Rate by ${match.RATE}`)}</div>
        :""}
        </>
    )
}
export default Passive_Total_Display