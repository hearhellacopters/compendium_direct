import React from "react";
import ReplacerCharacter from '../../ReplacerCharacter'

export default function OptionParsFormattingEnemy({
    enemy_option,
}){

    const transdata = enemy_option

    return (
        <div className={transdata.type == 1 ? `upgradedorg enemyabilityinfobase` :
            transdata.type == 2 ? `Buffbase enemyabilityinfobase` :
                transdata.type == 3 ? `Buffbase enemyabilityinfobase` :
                    `Nocolorbase enemyabilityinfobase`}>
            <div >
                <div>
                    {`\xa0${transdata.label_str == "" && transdata.passives != undefined && transdata.passives.length == 0 ? "-" : "┬"} `}
                    {transdata && transdata.title_str && ReplacerCharacter(transdata.title_str)}
                </div>
                {transdata && transdata.label_str != "" ?
                    <div>
                        {`\xa0${transdata.passives && transdata.passives.length != 0 ? "├─" : "└─"} `}{ReplacerCharacter(transdata.label_str)}
                    </div>
                    : ""
                }
                {transdata && transdata.passives && transdata.passives.length != 0 ?
                    <div>
                        {transdata.passives.map((self, key) => {
                            const lastkey = (transdata.passives.length) - 1
                            return (
                                <div key={key}>
                                    {ReplacerCharacter(`\xa0${key == lastkey ? "└─ Active " : "├─ Active "} [${self.name}]`)}{" "}<span className={self.loc_tag && self.loc_tag}></span>
                                </div>
                            )
                        }
                        )}
                    </div>
                    : ""}
            </div>
        </div>
    )
}