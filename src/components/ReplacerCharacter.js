import React from 'react';
import Capped from './Capped';
import reactStringReplace from "react-string-replace"

export default function ReplacerCharacter(text, options){

    // No up down on Titles or Ability,
    // Yes up down on Buffs or Passives
    // Diffing for diffing
    // formatting switch
    const {formatting, updown, force_page, diffing} = options || {}

    if(formatting == false){
        return text
    }

    let replacement = text
    var number = 0

    //special case
    replacement = replacement && replacement.replace(/<Battle Aspect>/gm, "＜Battle Aspect＞")

    replacement = replacement && replacement.replace(/<Material>/gm, "＜Material＞")

    replacement = replacement && replacement.replace(/<Spiritual>/gm, "＜Spiritual＞")

    if(force_page){
        
        replacement = replacement && replacement.replace(/(HP Damage Bonus:\n)/gm, "<BonusHPDamage>")

        replacement = replacement && replacement.replace(/(\[.*\(F\)\])/gm, "<wpfr_buff>")

    }

    //diff formatting
    if(diffing){
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /\^\^(.+?)\^\.\^/gms, (match, i) => {
            number = number + 1
            return (
                <mark key={`44-${i}-${number}`} className={"REMOVED_LINE"}>{ReplacerCharacter(match)}</mark>
            )
        })
    
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /~~(.+?)~\.~/gms, (match, i) => {
            number = number + 1
            return (
                <mark key={`55-${i}-${number}`} className={"ADDED_LINE"}>{ReplacerCharacter(match)}</mark>
            )
        })    
    }
    
    //standard
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
        number = number + 1
        return (
            <br key={`10-${i}-${number}`} />
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
        number = number + 1
        return (
            <br key={`11-${i}-${number}`} />
        )
    })
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
        number = number + 1
        return (
            <span key={`1-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`2-${i}-${number}`} className={`inline ${match2}`}></span>
                    )
                })
            }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /<(.*?)>/, (match, i) => {
        number = number + 1
        if(match == "AOE"){
            return "Group"
        }
        if(match == "Knock"){
            return <span key={`3-${i}-${number}`}><span className={`inline KnockBack`}/>Knock Back</span>
        }
        if(match == "Knock_Back"){
            return <span key={`3-${i}-${number}`}><span className={`inline KnockBack`}/>Knock Back</span>
        }
        if(match == "KnockBack"){
            return <span key={`3-${i}-${number}`}><span className={`inline KnockBack`}/>Knock Back</span>
        }
        if(match =="Heal"){
            return "Heal"
        }
        if(match =="Steal"){
            return "Steal"
        }
        if(match =="Inflicts"){
            return "Inflicts"
        }
        if(match =="Dispels"){
            return "Dispels"
        }
        if(match =="Debuff"){
            return "Debuff"
        }
        if(match =="Reduces"){
            return "Reduces"
        }
        if(match == "Counter"){
            return <span key={`3-${i}-${number}`} className={`glupdategreen`}>Counter</span>
        }
        if(match == "Trap"){
            return <span key={`3-${i}-${number}`} className={`glupdategreen`}>Trap</span>
        }
        if(match == "Follow"){
            return <span key={`3-${i}-${number}`} className={`glupdategreen`}>Follow Up</span>
        }
        if(match == "Follows_Up"){
            return <span key={`3-${i}-${number}`} className={`glupdategreen`}>Follows Up</span>
        }
        if(match == "Upgraded"){
            return <span key={`3-${i}-${number}`} className={`orangecolor`}>Upgraded</span>
        }
        if(match == "Upgrades"){
            return <span key={`3-${i}-${number}`} className={`orangecolor`}>Upgrades</span>
        }
        return (
            <span key={`3-${i}-${number}`} className={`inline ${match}`}></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\/\/(.*?)\/\//, (match, i) => {
        number = number + 1
        return (
            <img key={`17-${i}-${number}`} className={"inline-buff"} src={`https://dissidiacompendium.com/images/static/icons/buff/${match}.png`} />
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /([0-9]*\.[0-9]+%|[0-9]+%)/, (match, i) => {
        number = number + 1
        return (
            <span key={`4-${i}-${number}`} className="values">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
        number = number + 1
        return (
            <Capped key={`15-${i}-${number}`} text={match} />
        )
    })

    //only on up / down
    if(updown){
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down$|Down[\s])/, (match, i) => {
            number = number + 1
            return (
                <span key={`3-${i}-${number}`} className={"downstat"}>{match}</span>
            )
        })
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down,)/, (match, i) => {
            number = number + 1
            return (
                <span key={`3a-${i}-${number}`}><span className={"downstat"}>{"Down"}</span>,</span>
            )
        })
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up$|Up[\s])/, (match, i) => {
            number = number + 1
            return (
                <span key={`4-${i}-${number}`} className={"upstat"}>{match}</span>
            )
        })
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up,)/, (match, i) => {
            number = number + 1
            return (
                <span key={`4a-${i}-${number}`}><span className={"upstat"}>{"Up"}</span>,</span>
            )
        })
    }

    // only ability stuff
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /--(.*?)--/, (match, i) => {
        number = number + 1
        return (
            <span key={`16-${i}-${number}`} className="limit">{
                reactStringReplace(`[${match}]`, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return (
                        <span key={`17-${i}-${number}`} className={`inline ${match2}`}></span>
                    )
                })
            }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Turn Rate:)/, (match, i) => {
        number = number + 1
        return (
            <span key={`12-${i}-${number}`} className="trunrate">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /Chase (\+\d*)/, (match, i) => {
        number = number + 1
        return (
            <span key={`13-${i}-${number}`}><span className="lightblue">{"Chase "}</span><span className="unique">{match}</span></span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\*Can not knock back)/, (match, i) => {
        number = number + 1
        return (
            <span key={`14-${i}-${number}`} className="lightblue">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\*Instant Turn Rate)/, (match, i) => {
        number = number + 1
        return (
            <span key={`15-${i}-${number}`} className="trunrate">{match}</span>
        )
    })
    return (
        replacement
    )
}