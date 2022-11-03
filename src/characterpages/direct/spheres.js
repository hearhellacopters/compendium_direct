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
    enemy_type,
    cast_targets,
    passive_effects_data,
    char_id,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    command_data_effects,
    hit_data_effects,
    option_trans_data,
    
    ailment_group,
    command_group,
    enemy_resist,
    formatting
}) =>{

    const effect_ = passive_effects_data.effect_
    const require_passive = passive_effects_data.require_passive
    const passive_target = passive_effects_data.passive_target
    const trap_type = passive_effects_data.trap_type
    const param_id = passive_effects_data.param_id
    const attack_type = passive_effects_data.attack_type
    const killer_type = passive_effects_data.killer_type
    const elementid_1 = passive_effects_data.elementid_1
    const command_type = passive_effects_data.command_type
    const target_range_ = passive_effects_data.target_range_
  
    const getcastnames = Object.values(AilmentNames).map(self=>{
        return {[self.castID]: self}
      })
    
      const CastNames = getcastnames.reduce(function(result, item) {
        var key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
        }, {});

    return(
        <div className="characterpageholder">
                <div className="">
                  <div className="singlesubbanner">{profiledata.name}{"'s Spheres"}</div>
                  <div className="sphereletterholder filterholderflair somepadding">
                    <div className={`sphereletter ${profiledata.SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
                    <img className='inletter' src={profiledata.Sphere1 == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${profiledata.Sphere1}.png`} alt={profiledata.Sphere1}/>
                    </div>
                    <div className={`sphereletter ${profiledata.SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
                    <img className='inletter' src={ profiledata.Sphere2 == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${profiledata.Sphere2}.png`} alt={profiledata.Sphere2}/>
                    </div>
                    <div className={`sphereletter ${profiledata.SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
                    <img className='inletter' src={ profiledata.Sphere3 == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${profiledata.Sphere3}.png`} alt={profiledata.Sphere3}/>
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
                passivenames={passivenames}
                equipmentpassivenames={equipmentpassivenames}
                AilmentNames={AilmentNames}
                CommandNames={CommandNames}
                CondData={CondData}
                Ailment_Effects={Ailment_Effects}
                MessageData_Category={MessageData_Category}
                MessageData_FFSeries={MessageData_FFSeries}
                command_data_effects={command_data_effects}
                passive_effects_data={passive_effects_data}
                ailment_group={ailment_group}
                command_group={command_group}
                CastNames={CastNames}
                enemy_type={enemy_type}
                char_id={char_id}
                cast_targets={cast_targets}
                effect_={effect_}
                require_passive={require_passive}
                passive_target={passive_target}
                trap_type={trap_type}
                param_id={param_id}
                attack_type={attack_type}
                killer_type={killer_type}
                elementid_1={elementid_1}
                sphere_type={passive.sphere_type}
                sphere_letter={passive.ex_category_id}
                release={passive.start_date}
                target_range_={target_range_}
                command_type={command_type}
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