import React, {useState, useEffect} from 'react';
import Capped from './capped';
import addformatting_buff from './replacer_buffcontent';
import reactStringReplace from "react-string-replace"

const addformatting =(text)=>{
    let replacement = text
    var number = 0
    
    replacement = replacement == undefined ? "" : replacement.replace(/<Battle Aspect>/gm,"＜Battle Aspect＞")

    replacement = replacement && replacement.replace(/<Material>/gm,"＜Material＞")

    replacement = replacement && replacement.replace(/<Spiritual>/gm,"＜Spiritual＞")

    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\^\^(.+?)\^\.\^/gms, (match, i) => {
        number = number + 1
        return(
        <mark key={`44-${i}-${number}`} className={"REMOVED_LINE"}>{addformatting_buff(match)}</mark>
        )})

    replacement = replacement == "" ? "" : reactStringReplace(replacement, /~~(.+?)~\.~/gms, (match, i) => {
        number = number + 1
        return(
        <mark key={`55-${i}-${number}`} className={"ADDED_LINE"}>{addformatting_buff(match)}</mark>
        )})

    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
        number = number + 1
        return(
            <br key={`10-${i}-${number}`}/>
    )})
    
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
        number = number + 1
        return(
            <br key={`11-${i}-${number}`}/>
    )})
 
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
        number = number + 1
        return(
            <span key={`1-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return(
                        <span key={`2-${i}-${number}`} className={match2}></span>
                )})
            }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /--(.*?)--/, (match, i) => {
        number = number + 1
        return(
            <span key={`16-${i}-${number}`} className="limit">{
                reactStringReplace(`[${match}]`, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return(
                        <span key={`17-${i}-${number}`} className={match2}></span>
                )})
                }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
        number = number + 1
        return(
        <Capped key={`5-${i}-${number}`} text={match}/>
        )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
        number = number + 1
        return(
        <span key={`6-${i}-${number}`} className="values">{match}</span>
    )})
    replacement = replacement == "" ? "" :reactStringReplace(replacement, /<(.*?)>/, (match, i) => {
        number = number + 1
        return(
        <span key={`7-${i}-${number}`} className={match}></span>
    )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Turn\xa0Rate:)/, (match, i) => {
        number = number + 1
        return(
        <span key={`12-${i}-${number}`} className="trunrate">{match}</span>
    )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /Chase\xa0(\+\d*)/, (match, i) => {
        number = number + 1
        return(
            <span key={`13-${i}-${number}`}><span className="lightblue">{"Chase\xa0"}</span><span className="unique">{match}</span></span>
    )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\*Can\xa0not knock back)/, (match, i) => {
        number = number + 1
        return(
        <span key={`14-${i}-${number}`} className="lightblue">{match}</span>
    )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\*Instant\xa0Turn Rate)/, (match, i) => {
        number = number + 1
        return(
        <span key={`15-${i}-${number}`} className="trunrate">{match}</span>
    )})
    return(
        replacement
    )
}
export default addformatting