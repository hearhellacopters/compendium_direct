import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'

const Credits = () => {

    return(
        <div className="wrapper">
            <Helmet>
                <title>Acknowledgements - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium"/>
                <meta property="og:type" content="website" />
                <meta name="description" content="Compendium Acknowledgements."/>
                <meta name="twitter:title" content="Compendium Acknowledgements Page."/>
                <meta name="twitter:description" content="Compendium Acknowledgements Page."/>
                <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo152.png"/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image:alt" content="Dissidia Compendium"/>
                <meta property="og:title" content="Compendium Acknowledgements"/>
                <meta property="og:description" content="Compendium Acknowledgements Page."/>
                <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo152.png"/>
                <meta property="og:url" content="https://dissidiacompendium.com/credits"/>
            </Helmet>
            <div className="content fullheight">
                <h1>Acknowledgements</h1>
                <div className="creditsholder">
                    <div className="filterholderflair" >
                        The Compendium Dev Team would like to thank:
                    </div>
                    <ul className="creditslist">
                            <li>
                                <span className="gemcredits"></span> Crux - for his tireless work on decoding many game systems
                            </li>
                            <li>
                                <span className="gemcredits"></span> Joschka - for his amazing texture plugin
                            </li>
                            <li>
                                <span className="gemcredits"></span> Yretenai - for her awesome programming tools
                            </li>
                            <li>
                                <span className="gemcredits"></span> Kira - for all her translations
                            </li>
                            <li>
                                <span className="gemcredits"></span> Safeena - for her spreadsheets that started everything
                            </li>
                            <li>
                                <span className="gemcredits"></span> Keeper of Record - for his help on the song titles
                            </li>
                            <li>
                                <span className="gemcredits"></span> Facade - for his translations
                            </li>
                            <li>
                                <span className="gemcredits"></span> Quetzalma - for his encouragement
                            </li>
                        </ul>
                        <div className="filterholderflair" >
                        And a big thank you to our Beta testers:
                        </div>
                        <ul className="betalist">
                            <li>
                                <span className="gemcredits"></span> Lucy
                            </li>
                            <li>
                                <span className="gemcredits"></span> SimplyLost
                            </li>
                            <li>
                                <span className="gemcredits"></span> IndolentLard
                            </li>
                            <li>
                                <span className="gemcredits"></span> FoxDie
                            </li>
                            <li>
                                <span className="gemcredits"></span> Astinosis
                            </li>
                            <li>
                                <span className="gemcredits"></span> inkwelder
                            </li>
                            <li>
                                <span className="gemcredits"></span> Amira
                            </li>
                            <li>
                                <span className="gemcredits"></span> Mustu
                            </li>
                            <li>
                                <span className="gemcredits"></span> Tarutaru
                            </li>
                            <li>
                                <span className="gemcredits"></span> The Sensational Ian
                            </li>
                        </ul>
                        <div className="filterholderflair" >
                        Want to support us?
                        </div>
                        <div className="creditslist">
                            While we don't accept montary contributions at this time, giving our <a className="updatelink" target="_blank" rel="noreferrer" href="https://discord.gg/Y3Yn6gb"><span className="discordcredit"></span></a> server a boost will allow us to continue serving the community and creating fun emojis for everyone to use!<br/>
                            <br/>
                        <div className="emojiholder">
                            <img alt="Strago Crazy" className="stragocrazy"></img>
                            <img alt="Alisaie" className="alisaie"></img>
                            <img alt="Aphmau" className="aphmau"></img>
                            <img alt="Vayne" className="vayne"></img>
                            <img alt="Lilisette" className="liliwink"></img>
                        </div>
                        <br/>
                            Our full ablum of emoji's can be found at this <a className="updatelink" target="_blank" rel="noreferrer" href="https://imgur.com/a/yIZk4tX">imgur</a>.
                        </div>
                </div>
                <Link className="updatelink" to="/log">
                   - App Update Log -
                </Link>
            </div>
        </div>
    )
}

export default Credits;