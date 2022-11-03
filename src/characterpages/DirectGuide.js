import React from "react";

const Direct_Guide = () =>{
    return(
        <div className="content">
            <h1>Direct Guide</h1>
            <div className="subheader">
            <img className="logo2" alt="Direct Logo" src="https://dissidiacompendium.com/images/static/site/CompendiumDirect_Logo_Smaller.png"/>
            </div>
            <div className="creditsholder">
                <div className="filterholderflair">FAQ</div>
                <div className='video-wrap'>
                    <div className="video-container">
                        <iframe src={`https://www.youtube.com/embed/NYU1Puu5ZXw`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="subheader">
                What is "Compendium Direct"?
                </div>
                <div className="creditslist">
                Compendium Direct is a new area in the character section of the site where you can explore direct data translations of all character abilities, buffs, passives and gear. Here you can find official game text, including fully built abilities and buffs of both current game versions!
                <p/>
                <a rel="noreferrer noopener" target="_blank" href="https://dissidiacompendium.com/images/static/site/direct_guide6.png"><img className="direct_imageguide" alt="Direct Location" src="https://dissidiacompendium.com/images/static/site/direct_guide6.png"/></a>
                <p/>
                </div>
                <div className="subheader">
                What is the difference / advantage of viewing the data this way?
                </div>
                <div className="creditslist">
                {"A data direct translation is script generated using the game`s direct character tables as a source. This method ensures the most accurate translations possible."}
                <p/>
                While this way removes human error, a downside can also be the lack of “humanness” that our main character sections offer (that will still be updated regularly).
                </div>
                <p/>
                <div className="subheader">
                How do I navigate this new area? 
                </div>
                <div className="creditslist">
                Each section offers many tools for finding and filtering just the results you want. This includes:
                <p/>
                {"In the Buffs section you`ll find the most powerful versions of the character`s buffs and debuffs including what ability they came from. It also features all buffs & debuffs that are casted at the start of quest and their requirements."}
                <p/>
                <a rel="noreferrer noopener" target="_blank" href="https://dissidiacompendium.com/images/static/site/direct_guide4.png"><img className="direct_imageguide" alt="Direct buffs" src="https://dissidiacompendium.com/images/static/site/direct_guide4.png"/></a>
                <p/>
                In the Abilities section, we have every possible combination of the character`s abilities completely built (unlike the main character area where we break every ability down into its base and build it up with each additional increase). You will find everything is number coded so you can search or filter by just the IDs of what you`re looking for.
                <p/>
                <a rel="noreferrer noopener" target="_blank" href="https://dissidiacompendium.com/images/static/site/direct_guide2.png"><img className="direct_imageguide" alt="Direct Ids" src="https://dissidiacompendium.com/images/static/site/direct_guide2.png"/></a>
                <p/>
                To navigate the vast number of abilities, we have designed an easy to use interactive flowchart. The Ability Map allows you to easily see how abilities are upgraded and what their required conditions are. You can also pan, zoom, filter and jump to just the ability you are looking for!
                <p/>
                <a rel="noreferrer noopener" target="_blank" href="https://dissidiacompendium.com/images/static/site/direct_guide3.png"><img className="direct_imageguide" alt="Direct map" src="https://dissidiacompendium.com/images/static/site/direct_guide3.png"/></a>
                 <p/>
                 All passive abilities show their description natively and all effects that are applied when equipped. Passives that grant abilities or ability upgrades will show all required passives needed to unlock the ability. Any granted or referenced buffs or debuffs will also be displayed at the bottom for easy viewing.
                 <p/>
                <a rel="noreferrer noopener" target="_blank" href="https://dissidiacompendium.com/images/static/site/direct_guide5.png"><img className="direct_imageguide" alt="Direct passives" src="https://dissidiacompendium.com/images/static/site/direct_guide5.png"/></a>
                 <p/>
                 And finally there is the events page with a complete event history of the character from the selected version. Complete with official event title, event image and all synergy characters.
                 <p/>
                <a rel="noreferrer noopener" target="_blank" href="https://dissidiacompendium.com/images/static/site/direct_guide7.png"><img className="direct_imageguide" alt="Direct events" src="https://dissidiacompendium.com/images/static/site/direct_guide7.png"/></a>
                 <p/>
                </div>
                <div className="subheader">
                Why aren`t passive increases displayed on abilities?
                </div>
                <div className="creditslist">
                Due to the many conditions that are present on passives, generating accurate information of when a passive would be active on each ability would result in a lot of repeated information. To limit the data load and keep the site mobile friendly, passive info is found in their respective location only.
                <p/>
                </div>
                <div className="subheader">
                Why is there Japanese text in the GL section?
                </div>
                <div className="creditslist">
                The global version`s data sometimes leapfrogs where it was at during the same period in JP. So early data is often not translated yet until closer to release.
                <p/>
                </div>
                <div className="subheader">
                Is this section mobile friendly?
                </div>
                <div className="creditslist">
                While this section is formatted to fit on smaller screens, the amount of data needed to generate the pages may be taxing on mobile devices and a smooth experience is not guaranteed. So while mobile is supported, desktop is preferred.
                <p/>
                </div>
                <div className="subheader">
                Can I cross character search this data like I can in the search tab?
                </div>
                <div className="creditslist">
                Unfortunately no. The amount of data it takes to generate these translations are over ten times what it takes for the main sections of the site. In order to keep the site not only mobile friendly but not slow your browser to a crawl, the data is broken down to be accessed by each individual character.
                <p/>
                </div>
                <div className="subheader">
                What should I do if I spot a discrepancy between the two sections? 
                </div>
                <div className="creditslist">
                {"Please contact a "}<a className="updatelink" rel="noreferrer noopener" target="_blank" href="https://discord.gg/Y3Yn6gb">discord developer</a>{" or "}<a className="updatelink"  rel="noreferrer noopener" href="https://drive.google.com/open?id=1IJE93eDUcKIEKuQH0jwMZ7WaWVcrldUqbc6EyEZRrzs" target="_blank">submit a bug report form.</a>
                </div>
                
            </div>
        </div>

    )
}
export default Direct_Guide