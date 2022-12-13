import React, { useState, useEffect } from 'react';
import Capped from './capped';
import reactStringReplace from "react-string-replace"

const addformatting = (text) => {
    let replacement = text
    var number = 0

    replacement = replacement == undefined ? "" : replacement.replace(/<Battle Aspect>/gm, "＜Battle Aspect＞")

    replacement = replacement && replacement.replace(/<Material>/gm, "＜Material＞")

    replacement = replacement && replacement.replace(/<Spiritual>/gm, "＜Spiritual＞")

    replacement = replacement && replacement.replace(/(\[.*\(F\)\])/gm, "<wpfr_buff>")
    replacement = replacement && replacement.replace(/(HP Damage Bonus:\n)/gm, "<BonusHPDamage>")

    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(＜Battle Aspect＞)/, (match, i) => {
        number = number + 1
        return (
            <span key={`88-${i}-${number}`} className="unique">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
        number = number + 1
        return (
            <br key={`98-${i}-${number}`} />
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
        number = number + 1
        return (
            <br key={`99-${i}-${number}`} />
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(▲)/, (match, i) => {
        number = number + 1
        return (
            <span key={`89-${i}-${number}`} className={"enemybuff"}></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(▼)/, (match, i) => {
        number = number + 1
        return (
            <span key={`90-${i}-${number}`} className={"enemydebuff"}></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(►)/, (match, i) => {
        number = number + 1
        return (
            <span key={`91-${i}-${number}`} className={"enemygear"}></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /• (.*?):/, (match, i) => {
        number = number + 1
        return (
            <span key={`95-${i}-${number}`}>{"•\xa0"}<span className={"unique"}>{
                match = match == "" ? "" : reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`92a-${i}-${number}`} className={match2}></span>
                    )
                })
            }</span>{":"}</span>
        )
    })
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
        number = number + 1
        return (
            <span key={`1-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`2-${i}-${number}`} className={match2}></span>
                    )
                })
            }</span>
        )
    })
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(「.*?」)/, (match, i) => {
        number = number + 1
        return (
            <span key={`1a-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`2a-${i}-${number}`} className={match2}></span>
                    )
                })
            }</span>
        )
    })
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(・.*?：)/, (match, i) => {
        number = number + 1
        return (
            <span key={`1c-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`2c-${i}-${number}`} className={match2}></span>
                    )
                })
            }</span>
        )
    })
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(【.*?】)/, (match, i) => {
        number = number + 1
        return (
            <span key={`1b-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`2b-${i}-${number}`} className={match2}></span>
                    )
                })
            }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /<(.*?)>/, (match, i) => {
        number = number + 1
        return (
            <span key={`92-${i}-${number}`} className={match}></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
        number = number + 1
        return (
            <Capped key={`194-${i}-${number}`} text={match} />
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down$|Down[\s])/, (match, i) => {
        number = number + 1
        return (
            <span key={`93-${i}-${number}`} className={"downstat"}>{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down;)/, (match, i) => {
        number = number + 1
        return (
            <span key={`93a-${i}-${number}`}><span className={"downstat"}>{"Down"}</span>;</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down,)/, (match, i) => {
        number = number + 1
        return (
            <span key={`93b-${i}-${number}`}><span className={"downstat"}>{"Down"}</span>,</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up$|Up[\s])/, (match, i) => {
        number = number + 1
        return (
            <span key={`94-${i}-${number}`} className={"upstat"}>{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up;)/, (match, i) => {
        number = number + 1
        return (
            <span key={`94a-${i}-${number}`}><span className={"upstat"}>{"Up"}</span>;</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up,)/, (match, i) => {
        number = number + 1
        return (
            <span key={`94b-${i}-${number}`}><span className={"upstat"}>{"Up"}</span>,</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
        number = number + 1
        return (
            <span key={`96-${i}-${number}`} className="values">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(※.*※)/, (match, i) => {
        number = number + 1
        return (
            <span key={`97-${i}-${number}`} className="enemysubheader">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\(ALL\) Enemies)/, (match, i) => {
        number = number + 1
        return (
            <span key={`98-${i}-${number}`} className="all_enemies"></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Party \(ALL\))/, (match, i) => {
        number = number + 1
        return (
            <span key={`99-${i}-${number}`} className="all_party"></span>
        )
    })
    return (
        replacement
    )
}
export default addformatting