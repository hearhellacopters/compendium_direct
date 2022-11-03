import React from "react";
import LevelsFormattingDetails from "./LevelsFormattingDetails";

const EnemyDetailsLevelHanlder = ({
    enemy_id,
    Level,
    ProcessedLevels,
    chase
})=>{

    const filtered = ProcessedLevels.filter(self=>self.enemyID == enemy_id).reverse()

    return(
        filtered != undefined ?
        <div className={`enemyholderdesc margtop lighterblue`}>
            <LevelsFormattingDetails setlevel={Level} alllevels={filtered} chase={chase} enemy_id={enemy_id}/>
        </div>
        : "Loading..."
    )
}
export default EnemyDetailsLevelHanlder