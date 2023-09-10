import React from 'react';
import Capped from './Capped';
import reactStringReplace from "react-string-replace"

const span_formatting = (match, i, number) =>{
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
    if(match == "Knocked_Back"){
        return <span key={`3-${i}-${number}`}><span className={`inline KnockBack`}/>Knocked Back</span>
    }
    if(match == "KnockedBack"){
        return <span key={`3-${i}-${number}`}><span className={`inline KnockBack`}/>Knocked Back</span>
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
    if( match == "Melee" ||
        match == "Ranged" ||
        match == "Magic" ||
        match == "HP" ||
        match == "BRV" ||
        match == "CP" ||
        match == "Fire" ||
        match == "Ice" ||
        match == "Thunder" ||
        match == "Water" ||
        match == "Earth" ||
        match == "Wind" ||
        match == "Holy" ||
        match == "Dark" ||
        match == "Gil" || 
        match == "Gem" ||
        match == "DISSIDIAPoints" ||
        match == "Perfect" ||
        match == "Redcrystalmini" ||
        match == "Bluecrystalmini" ||
        match == "Greencrystalmini" ||
        match == "Whitecrystalmini" ||
        match == "Blackcrystalmini" ||
        match == "Yellowcrystalmini" ||
        match == "EX" ||
        match == "BREAK" ||
        match == "BonusHPDamage" ||
        match == "crypoints"
    ){
        return <span key={`3-${i}-${number}`} className={`inline ${match}`}></span>
    }
    return (
        <img key={`3-${i}-${number}`} className={"inline-buff"} src={`https://dissidiacompendium.com/images/static/icons/geartype/${match}.png`} />
    )
}

export default function ReplacerEnemyDesc(text){
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
                    return span_formatting(match2, i ,number)
                })
            }</span>{":"}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /\/\/(.*?)\/\//, (match, i) => {
        number = number + 1
        return (
            <img key={`17-${i}-${number}`} className={"inline-buff"} src={`https://dissidiacompendium.com/images/static/icons/buff/${match}.png`} />
        )
    })
    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
        number = number + 1
        return (
            <span key={`1-${i}-${number}`} className="unique">{
                reactStringReplace(match, /<(.*?)>/, (match2, i) => {
                    number = number + 1
                    return span_formatting(match2, i ,number)
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
                    return span_formatting(match2, i ,number)
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
                    return span_formatting(match2, i ,number)
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
                    return span_formatting(match2, i ,number)
                })
            }</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /<(.*?)>/, (match, i) => {
        number = number + 1
        return span_formatting(match, i ,number)
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
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /([0-9]*\.[0-9]+%|[0-9]+%)/, (match, i) => {
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
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /■ (.*)/, (match, i) => {
        number = number + 1
        return (
            <span key={`100-${i}-${number}`} className="Cancel">{match}</span>
        )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /■(.*)/, (match, i) => {
        number = number + 1
        return (
            <span key={`101-${i}-${number}`} className="Cancel">{match}</span>
        )
    })
    return (
        replacement
    )
}