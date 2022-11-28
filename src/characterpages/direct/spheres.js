import React from "react";
import { Link } from 'react-router-dom'
import Tippy from '../../formatting/TippyDefaults'
import Sphere_Passive_Ability_Formatting from "./formatting/passives/Sphere_Passive_Ability_Formatting";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

const Spheres_Page = ({
    data,
    ver,
    loc,

    profiledata,
    char_data,
    ProcessedEventsIndex,

    master_index,
    formatting
}) =>{

    return(
        <div className="characterpageholder">
                <div className="">
                  <div className="singlesubbanner">{profiledata.CharacterName}{"'s Spheres"}</div>
                  <div className="sphereletterholder filterholderflair somepadding">
                        <div className={`sphereletter ${profiledata.SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
                        <LazyLoadImage effect="opacity" src={profiledata.SphereSlot1Letter == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${profiledata.SphereSlot1Letter}.png`} alt={profiledata.Sphere1}/>
                        </div>
                        <div className={`sphereletter ${profiledata.SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
                        <LazyLoadImage effect="opacity" src={ profiledata.SphereSlot2Letter == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${profiledata.SphereSlot2Letter}.png`} alt={profiledata.Sphere2}/>
                        </div>
                        <div className={`sphereletter ${profiledata.SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
                        <LazyLoadImage effect="opacity" src={ profiledata.SphereSlot3Letter == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${profiledata.SphereSlot3Letter}.png`} alt={profiledata.Sphere3}/>
                        </div>
                    </div>
                </div>
                {data.length > 0 ?  (
                data.map(passive => (passive.passive && 
                <Sphere_Passive_Ability_Formatting 
                key={passive.pa_id}
                passive_ability={passive.passive}
                ver={ver}
                loc={loc}
                file={"exskill"}
                Single={true}

                master_index={master_index}

                sphere_type={passive.sphere_type}
                sphere_letter={passive.ex_category_id}
                release={passive.start_date}
                formatting={formatting}

                banner_color={"newblue"}
                base_color={"bluebase"}
                raw={passive}
                />
                ))) : (
                  <div className="">No Data</div>
                )}
              
            {char_data && char_data.SphereArray && char_data.SphereArray.length != 0 ?
            <div className="zone makeitfull">
            <div className="featuredbanner">Refined Sphere Events</div>

            {char_data && char_data.SphereArray && char_data.SphereArray.map(events => {
                  const match = ProcessedEventsIndex[events]
                  return  <li className="nolistevents" id={match && match.type} key={events}>
                    <div className="charalistflarholder">
                        <div className="titlemainupdateholder">
                            <Link to={`/events/${events}`}>
                                <Tippy content={match && match.label}>
                                    <div className="singleevenimageholder">
                                        <LazyLoadImage effect="opacity" className={`eventimage withshadow showlink`} src={match && match.url} alt={match && match.label} />
                                    </div>
                                </Tippy>   
                            </Link>
                        </div>
                    </div>
                </li>
                })}
             
            </div>
            :""}
        </div>
        )
}
export default Spheres_Page