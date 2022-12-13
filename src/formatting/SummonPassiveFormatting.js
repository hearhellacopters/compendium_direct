import React from 'react';
import addformatting from '../processing/replacer_abilitycontent';

const SummonsPassiveFormatting = ({ match }) => {

    const sumlist = ["", "Ifrit", "Shiva", "Ramuh", "Leviathan", "Brothers", "Pandemonium", "Diabolos", "Alexander", "Odin", "Bahamut", "Chocobo", "Sylph", "Mog"]
    const colortitle = ["blackbanner", "Abanner", "Bbanner", "Dbanner", "bluebanner", "Dbanner", "Cbanner", "blackbanner", "Dbanner", "Nocolorbanner", "Bbanner", "Dbanner", "Cbanner", "Nocolorbanner"]
    const colorbase = ["blackbase", "Abase", "Bbase", "Dbase", "bluebase", "Dbase", "Cbase", "blackbase", "Dbase", "Nocolorbase", "Bbase", "Dbase", "Cbase", "Nocolorbase"]

    return (
        <div className="sumabilitydesc makefull">
            <div className={`infonameholder ${colortitle[sumlist.indexOf(match.SummonName)]}`}>
                <div className="spacearound">
                    <span className="smallpassive" />&nbsp;{match.PassiveName}
                </div>
                {match.JPName != null ?
                    <div className="abilitysubJPname">
                        {match.JPName}
                    </div>
                    : ""}
                <div className="CPReqHolder">
                    <span className="unique">{"Req. "}</span><span className="CPIcon CPIconSmaller"></span>&nbsp;&nbsp;{match.PassiveCost}
                </div>
            </div>
            <div className={`infobase lowerspace ${colorbase[sumlist.indexOf(match.SummonName)]}`}>
                {addformatting(match.PassiveDesc)}
            </div>
        </div>
    )
}
export default SummonsPassiveFormatting;