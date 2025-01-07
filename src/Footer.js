import React from 'react';
import { Link } from 'react-router-dom'

export default function Footer({
    devSite,
    setdevSite
}){
    const devButton = () => {
        setdevSite((prevValue) => !prevValue);
    }

    return (
        <div id="footer">
            <div id="footerholder">
                Dissidia Compendium is not affiliated with Square Enix in any way. All materials are the property of KOEI TECMO GAMES/SQUARE ENIX CO., LTD. All Rights Reserved.
                <br></br>
                Created by <a rel="noreferrer noopener" target="_blank" href="https://www.reddit.com/user/hearhellacopters" >hearhellacopters</a> with <Link to="/credits">acknowledgements</Link>. Join our <a rel="noreferrer noopener" target="_blank" href="https://discord.gg/Y3Yn6gb">Discord</a>. Go to <Link to="/" ><span onClick={devButton}>{devSite ? "Main Site" : "Dev Site"}</span></Link>
            </div>
        </div>
    )
}