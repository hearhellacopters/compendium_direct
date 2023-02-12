import React from "react"

const StatsMaker = ({
    title,
    bg_class,
    HP,
    INTBRV,
    MAXBRV,
    DEF,
    ATK
})=>{
    return(
        <div className={`sumimgholder ${bg_class!= undefined?bg_class:""}`}>
            <div className="boardstatstitle">{title}</div>
            <div className={`primeenemystats margauto`}>
            <div className="stattags">
                {HP != undefined?
                <div className="stattag">
                <div className="lefttagholder"></div>
                <div className="statcenter">HP</div>
                <div className="righttagholder"></div>
                </div>
                :""}
                {INTBRV != undefined?
                <div className="stattag">
                <div className="lefttagholder"></div>
                <div className="statcenter">INT BRV</div>
                <div className="righttagholder"></div>
                </div>
                :""}
                {MAXBRV != undefined?
                <div className="stattag">
                <div className="lefttagholder"></div>
                <div className="statcenter">MAX BRV</div>
                <div className="righttagholder"></div>
                </div>
                :""}
                {ATK != undefined?
                <div className="stattag">
                <div className="lefttagholder"></div>
                <div className="statcenter">ATK</div>
                <div className="righttagholder"></div>
                </div>
                :""}
                {DEF != undefined?
                <div className="stattag">
                <div className="lefttagholder"></div>
                <div className="statcenter">DEF</div>
                <div className="righttagholder"></div>
                </div>
                :""}
            </div>
            <div className="statvalueholders">
                {HP!=undefined?
                <div className={`enemystatsvalue`}>
                {HP}
                </div>
                :""}
                {INTBRV!=undefined?
                <div className={`enemystatsvalue`}>
                {INTBRV}
                </div>
                :""}
                {MAXBRV!=undefined?
                <div className={`enemystatsvalue`}>
                {MAXBRV}
                </div>
                :""}
                {ATK!=undefined?
                <div className={`enemystatsvalue`}>
                {ATK}
                </div>
                :""}
                {DEF!=undefined?
                <div className={`enemystatsvalue`}>
                {DEF}
                </div>
                :""}
            </div>
            </div>
        </div>
    )
}
export default StatsMaker