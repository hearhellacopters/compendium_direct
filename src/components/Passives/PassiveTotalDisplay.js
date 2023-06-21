import React from "react";
import ReplacerCharacter from '../ReplacerCharacter'

export default function PassiveTotalDisplay({
    match
}){
    const form = {updown:true}
    return (
        <>
            {match.HPRETAIN != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party Retains ${match.HPRETAIN}% of HP Damage Bonus after Force Time ends`,form)}</div>
                : ""}

            {match.BONUSSTART != 0 ?
                <div>&nbsp;{ReplacerCharacter(`+${match.BONUSSTART}% HP Damage Bonus at start of Force Time`,form)}</div>
                : ""}
            {match.BONUSEND != 0 ?
                <div>&nbsp;{ReplacerCharacter(`+${match.BONUSEND}% HP Damage Bonus at end of turn`,form)}</div>
                : ""}

            {match.GAUGE != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Increases Force Gauge by ${match.GAUGE}%`,form)}</div>
                : ""}

            {match.BRVCAP != 0 && match.P_BRVCAP == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- BRV Damage Cap Up by ${match.BRVCAP}% (+${Math.round(100 * match.BRVCAP).toLocaleString("en-US")})`,form)}</div>
                : ""}
            {match.P_BRVCAP != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party BRV Damage Cap Up by ${match.P_BRVCAP}% (+${Math.round(100 * match.P_BRVCAP).toLocaleString("en-US")}${match.BRVCAP != 0 ? `; ${match.P_BRVCAP + match.BRVCAP}% self: +${Math.round(100 * (match.P_BRVCAP + match.BRVCAP)).toLocaleString("en-US")}` : ""})`,form)}</div>
                : ""}

            {match.MAXCAP != 0 && match.P_MAXCAP == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- MAX BRV Cap Up by ${match.MAXCAP}% (+${Math.round(1000 * match.MAXCAP).toLocaleString("en-US")})`,form)}</div>
                : ""}
            {match.P_MAXCAP != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party MAX BRV Cap Up by ${match.P_MAXCAP}% (+${Math.round(1000 * match.P_MAXCAP).toLocaleString("en-US")}${match.MAXCAP != 0 ? `; ${match.P_MAXCAP + match.MAXCAP}% self: +${Math.round(1000 * (match.P_MAXCAP + match.MAXCAP)).toLocaleString("en-US")}` : ""})`,form)}</div>
                : ""}

            {match.ATK != 0 && match.P_ATK == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- ATK Up by ${match.ATK}%`,form)}</div>
                : ""}
            {match.P_ATK != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party ATK Up by ${match.P_ATK}%${match.ATK != 0 ? ` (self: ${match.P_ATK + match.ATK}%)` : ""}`,form)}</div>
                : ""}

            {match.MBRV != 0 && match.P_MBRV == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- MAX BRV Up by ${match.MBRV}%`,form)}</div>
                : ""}
            {match.P_MBRV != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party MAX BRV Up by ${match.P_MBRV}%${match.MBRV != 0 ? ` (self: ${match.P_MBRV + match.MBRV}%)` : ""}`,form)}</div>
                : ""}

            {match.IBRV != 0 && match.P_IBRV == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- INT BRV Up by ${match.IBRV}%`,form)}</div>
                : ""}
            {match.P_IBRV != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party INT BRV Up by ${match.P_IBRV}%${match.IBRV != 0 ? ` (self: ${match.P_IBRV + match.IBRV}%)` : ""}`,form)}</div>
                : ""}

            {match.DEF != 0 && match.P_DEF == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- DEF Up by ${match.DEF}%`,form)}</div>
                : ""}
            {match.P_DEF != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party DEF Up by ${match.P_DEF}%${match.DEF != 0 ? ` (self: ${match.P_DEF + match.DEF}%)` : ""}`,form)}</div>
                : ""}

            {match.SPD != 0 && match.P_SPD == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- SPD Up by ${match.SPD}%`,form)}</div>
                : ""}
            {match.P_SPD != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party SPD Up by ${match.P_SPD}%${match.SPD != 0 ? ` (self: ${match.P_SPD + match.SPD}%)` : ""}`,form)}</div>
                : ""}

            {match.BRVDMG != 0 && match.P_BRVDMG == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- BRV Damage Up by ${match.BRVDMG}%`,form)}</div>
                : ""}
            {match.P_BRVDMG != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party BRV Damage Up by ${match.P_BRVDMG}%${match.BRVDMG != 0 ? ` (self: ${match.P_BRVDMG + match.BRVDMG}%)` : ""}`,form)}</div>
                : ""}

            {match.GAINS != 0 && match.P_GAINS == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- BRV Gains Up by ${match.GAINS}%`,form)}</div>
                : ""}
            {match.P_GAINS != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party BRV Gains Up by ${match.P_GAINS}%${match.GAINS != 0 ? ` (self: ${match.P_GAINS + match.GAINS}%)` : ""}`,form)}</div>
                : ""}

            {match.S_OVER != 0 && match.P_S_OVER == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Stolen MAX BRV Overflow Up by ${match.S_OVER}%`,form)}</div>
                : ""}
            {match.P_S_OVER != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party Stolen MAX BRV Overflow Up by ${match.P_S_OVER}%${match.S_OVER != 0 ? ` (self: ${match.P_S_OVER + match.S_OVER}%)` : ""}`,form)}</div>
                : ""}

            {match.G_OVER != 0 && match.P_G_OVER == 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Gained MAX BRV Overflow Up by ${match.G_OVER}%`,form)}</div>
                : ""}
            {match.P_G_OVER != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Party Gained MAX BRV Overflow Up by ${match.P_G_OVER}%${match.G_OVER != 0 ? ` (self: ${match.P_G_OVER + match.G_OVER}%)` : ""}`,form)}</div>
                : ""}

            {match.RATE != 0 ?
                <div>&nbsp;{ReplacerCharacter(`- Increases Turn Rate by ${match.RATE}`,form)}</div>
                : ""}

        </>
    )
}