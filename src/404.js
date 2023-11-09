import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import Random from './processing/random.js'

export default function NotFound({
    loc
}){
    const randomimage = Random(7);

    const state_loc = history.state && history.state.usr && history.state.usr.loc || "404"

    const lastloc = loc != undefined ? loc : state_loc

    return (
        <div className="">
            <Helmet>
                <title>Page Not Found - Dissidia Compendium</title>
            </Helmet>
            <div className="content fullheight">
                <h1>Page not found</h1>
                <div className='subheader infolocation'>Location: {lastloc}</div>
                <div className="filterholder">
                    <div className="filterholderflair" >
                        <img alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${randomimage}.png`} />
                        <br />
                        <Link className="updatelink" to={`/`}>
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}