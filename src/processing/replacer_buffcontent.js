import React, {useState, useEffect} from 'react';
import Capped from './capped';
import addformatting from './replacer_abilitycontent';
import reactStringReplace from "react-string-replace"

const addformatting_buff =(text)=>{
    let replacement = text
    var number = 0

    replacement = replacement == undefined ? "" : replacement.replace(/<Battle Aspect>/gm,"＜Battle Aspect＞")

    replacement = replacement && replacement.replace(/<Material>/gm,"＜Material＞")

    replacement = replacement && replacement.replace(/<Spiritual>/gm,"＜Spiritual＞")

    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\^\^(.+?)\^\.\^/gms, (match, i) => {
        number = number + 1
        return(
        <mark key={`44-${i}-${number}`} className={"REMOVED_LINE"}>{addformatting(match)}</mark>
        )})

    replacement = replacement == "" ? "" : reactStringReplace(replacement, /~~(.+?)~\.~/gms, (match, i) => {
        number = number + 1
        return(
        <mark key={`55-${i}-${number}`} className={"ADDED_LINE"}>{addformatting(match)}</mark>
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

    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
        number = number + 1
        return(
            <span key={`16-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return(
                        <span key={`2-${i}-${number}`} className={match2}></span>
                )})
                }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down$|Down[\s])/, (match, i) => {
        number = number + 1
        return(
        <span key={`3-${i}-${number}`} className={"downstat"}>{match}</span>
        )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down,)/, (match, i) => {
        number = number + 1
        return(
        <span key={`3a-${i}-${number}`}><span className={"downstat"}>{"Down"}</span>,</span>
        )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up$|Up[\s])/, (match, i) => {
        number = number + 1
        return(
        <span key={`4-${i}-${number}`} className={"upstat"}>{match}</span>
        )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up,)/, (match, i) => {
        number = number + 1
        return(
        <span key={`4a-${i}-${number}`}><span  className={"upstat"}>{"Up"}</span>,</span>
        )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
        number = number + 1
        return(
        <Capped key={`15-${i}-${number}`} text={match}/>
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
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n\xa0)/, (match, i) => {
        number = number + 1
        return(
            <span key={`12-${i}-${number}`}><br/>{`\xa0`}</span>
    )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n\xa0)/, (match, i) => {
        number = number + 1
        return(
            <span key={`13-${i}-${number}`}><br/>{`\xa0`}</span>
    )})
    return(
        replacement
    )
}
export default addformatting_buff