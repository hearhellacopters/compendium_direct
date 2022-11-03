import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'

const Moving = () => {

    return(
        <div className="wrapper">
            <Helmet>
                <title>We're Moving! - Dissidia Compendium</title>
            </Helmet>
            <div className="content fullheight">
                <h1>We're Moving!</h1>
                <div className="filterholder">
                    <div className="filterholderflair" >
                        <img alt="Move" src={`https://dissidiacompendium.com/images/static/stamps/GL/39.png`}/>
                        <br/>
                        Site is in maintenance as we transtion into a new server<br/>
                        Check back soon!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Moving;