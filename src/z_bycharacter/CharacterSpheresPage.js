import React from "react";
import PassiveSphereFormatting from '../components/Passives/PassiveSphereFormatting';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterSpheresPage ({
  data,
  ver,
  loc,

  profiledata,

  master_index,

  formatting,
  scrollPosition
}) {

  return (
    <div className="ultimaweaponitemholder">
      <div className="">
        <div className="singlesubbanner">{profiledata.name}{"'s Spheres"}</div>
        <div className="sphereletterholder filterholderflair somepadding">
          <div className={`sphereletter ${profiledata.SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
            <img className='inletter' src={profiledata.Sphere1 == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/spheres/SphereLetter${profiledata.Sphere1}.png`} alt={profiledata.Sphere1} />
          </div>
          <div className={`sphereletter ${profiledata.SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
            <img className='inletter' src={profiledata.Sphere2 == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/spheres/SphereLetter${profiledata.Sphere2}.png`} alt={profiledata.Sphere2} />
          </div>
          <div className={`sphereletter ${profiledata.SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
            <img className='inletter' src={profiledata.Sphere3 == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/spheres/SphereLetter${profiledata.Sphere3}.png`} alt={profiledata.Sphere3} />
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        data.map(passive => (passive.passive &&
          <LazyLoadComponent
            key={passive.pa_id}
            scrollPosition={scrollPosition}
            placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
              <img className="loadingbardots" src="/images/static/site/loading.gif"/>
            </div>
              }
            >
          <PassiveSphereFormatting
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
            debugging={true}
            banner_color={"newblue"}
            base_color={"bluebase"}
            raw={passive}
          />
          </LazyLoadComponent>
        ))) : (
        <div className="">No Data</div>
      )}
    </div>
  )
}

export default trackWindowScroll(CharacterSpheresPage)