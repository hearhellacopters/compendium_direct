import React from 'react';
import Tippy from '../TippyDefaults.js';

export default function ResistIcons({ 
    resist, 
    attack, 
    small 
}){
    const makesmall = small != undefined ? small : ""
    return (
        <>
            {resist == 1 ?
                <div className={`${attack}resist1holder`}>
                    <div className={`${attack}resist1`}>-</div>
                </div>
                : ""}
            {resist == 2 ?
                <Tippy content="+50%" className="tooltip" >
                    <i className={`${attack}resist2${makesmall} ${small != undefined ? "marg10" : ""}`}></i>
                </Tippy>
                : ""}
            {resist == 3 ?
                <Tippy content="-50%" className="tooltip" >
                    <i className={`${attack}resist3${makesmall} ${small != undefined ? "marg10" : ""}`}></i>
                </Tippy>
                : ""}
            {resist == 4 ?
                <Tippy content="-90%" className="tooltip" >
                    <i className={`${attack}resist4${makesmall} ${small != undefined ? "marg10" : ""}`}></i>
                </Tippy>
                : ""}
            {resist == 5 ?
                <Tippy content="-100%" className="tooltip" >
                    <i className={`${attack}resist5${makesmall} ${small != undefined ? "marg10" : ""}`}></i>
                </Tippy>
                : ""}
            {resist == 6 ?
                <Tippy content="Absorb" className="tooltip" >
                    <i className={`${attack}resist6${makesmall} ${small != undefined ? "marg10" : ""}`}></i>
                </Tippy>
                : ""}
        </>
    )
}