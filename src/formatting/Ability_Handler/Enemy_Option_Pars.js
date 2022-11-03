import React, {useState, useEffect} from "react";
import replacer from '../../processing/replacer_titles'

const Enemy_Option_Pars=({
    enemy_option,
})=>{

    const transdata = enemy_option

    return(
        <div className={transdata.type == 1 ? `upgradedorg enemyabilityinfobase` :
                        transdata.type == 2 ? `Buffbase enemyabilityinfobase` :
                        transdata.type == 3 ? `Buffbase enemyabilityinfobase` :
                        `Nocolorbase enemyabilityinfobase`}>
            <div >
                <div>
                {`\xa0${transdata.label_str == "" && transdata.passives != undefined && transdata.passives.length == 0 ? "-" : "┬"} `}
                {transdata && transdata.title_str && replacer(transdata.title_str)}
                </div>
                {transdata && transdata.label_str != "" ?
                <div>
                {`\xa0${transdata.passives && transdata.passives.length != 0 ? "├─" :"└─"} `}{replacer(transdata.label_str)}
                </div>
                :""
                }
                {transdata && transdata.passives && transdata.passives.length != 0 ?
                <div>
                {transdata.passives.map((self,key)=>{
                    const lastkey = (transdata.passives.length) - 1
                   return(
                    <div key={key}>
                        {replacer(`\xa0${key == lastkey ? "└─ Active " : "├─ Active "} [${self.name}]`)}{" "}<span className={self.loc_tag && self.loc_tag}></span>
                    </div>
                   )
                } 
                )}
                </div>
                :""}
            </div>
        </div>
    )
}
export default Enemy_Option_Pars