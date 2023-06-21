import React from 'react';
import { Link } from 'react-router-dom'
import './Footer.css';

export default function Footer(){

    return (
        <div id="footer">
            <div id="footerholder">
                Dissidia Compendium is not affiliated with Square Enix in any way. All materials are the property of KOEI TECMO GAMES/SQUARE ENIX CO., LTD. All Rights Reserved.
                <br></br>
                Created by <a rel="noreferrer noopener" target="_blank" href="https://www.reddit.com/user/hearhellacopters" >hearhellacopters</a> with <Link to="/credits">acknowledgements</Link>. For assistance, please <a rel="noreferrer noopener" href="https://drive.google.com/open?id=1IJE93eDUcKIEKuQH0jwMZ7WaWVcrldUqbc6EyEZRrzs" target="_blank">submit a form </a> or join our <a rel="noreferrer noopener" target="_blank" href="https://discord.gg/Y3Yn6gb">Discord</a>.
            </div>
        </div>
    )
}