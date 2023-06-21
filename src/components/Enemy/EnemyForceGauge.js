import React from "react";
import DefaultTippy from '../../components/TippyDefaults.js';

export default function EnemyForceGauge({
    gauge_min,
    gauge_max
}){

    const max = 80

    const left_max_top = ((100 - gauge_max) - 8)
    const left_max_bottom = ((100 - gauge_max) + 5)

    const right_max_top = ((100 - gauge_min) - 7)
    const right_max_bottom = ((100 - gauge_min) + 4)

    var barfill = ""

    if (gauge_min >= 20) {
        barfill = 1
    }
    if (gauge_min >= 40) {
        barfill = 2
    }
    if (gauge_min >= 60) {
        barfill = 3
    }
    if (gauge_min >= 80) {
        barfill = 4
    }

    return (
        <div className="EFGaugeHolder">
            <DefaultTippy content={`Active between ${gauge_min}% - ${gauge_max}%`}>
                <img className="FGaugeTop" alt="FGauge" src={`https://dissidiacompendium.com/images/static/icons/buttons/frgauge/EnemyBarTop${barfill}.png`} />
            </DefaultTippy>
            <div className="FGaugeMiddle" style={{ clipPath: `polygon(${left_max_top}% 0%, ${right_max_top}% 0%, ${right_max_bottom}% 100%, ${left_max_bottom}% 100%)` }} />
            <div className="FGaugeMiddleFade" style={{ clipPath: `polygon(${left_max_top}% 0%, 100% 0%, 100% 100%, ${left_max_bottom}% 100%)` }} />
            <img className="FGaugeBottom" alt="FGaugeL" src="https://dissidiacompendium.com/images/static/icons/buttons/frgauge/EnemyBarBottom.png" />

        </div>
    )
}