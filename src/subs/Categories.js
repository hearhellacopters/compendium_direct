import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'
import DataHandOff from './DataHandOff';
import SubCategories from './SubCategories';
import { Helmet } from 'react-helmet-async';

const Categories = ({
  //loction
  ver,
  loc,
  file,
  newcompare,
  match,
  //indexes

  master_index,
  enemy_names,

  Access,
  //APIs
  ailment_data,
  ailment_group,
  command_group,
  ailment_rank,
  ailment_cast,
  ailment_field,
  ailment_field_effects,
  ailment_default,
  ailment_combination,
  ailment_modify,
  ailment_level_condition,
  cond_data,
  passive_ability,
  equipment_passive_ability,
  art_passive,
  link_eff_data,
  hit_data,
  enemy_resist,
  command_ability,
  character_option,
  enemy_option,
  character_ability,
  enemy_ability,
  summon_ability,
  file_list,

  gamelist_ailment,
  gamelist_ability,
  gamelist_passive,
  gamelist_sphere,
  gamelist_gear
}) => {

  const [hide, sethide] = useState(false);

  const hidebutton = () => {
    sethide((prevValue) => !prevValue);
  }


  return (
    <div className="">
      <Helmet>
        <title>{`${loc} - ${ver} - Dissidia Compendium Direct`}</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="description" content={loc + " - " + ver} />
      </Helmet>
      <div className="content">
        <div className="subdropmenu">
          <div className="levelcontainerDev select-container" onClick={hidebutton}>
            <div className="sub__control select-container-control">
              <div className="leveltext__value-container selectvalue-ValueContainer">
                <div className="leveltext__single-value selectvalue-singleValue">
                  {loc}
                </div>
              </div>
              <div className="leveltext__indicators select-container-IndicatorsContainer">
                <span className="leveltext__indicator-separator indicator-separator-indicatorSeparator"></span>
                <div className="leveltext__indicator leveltext__dropdown-indicator dropdown-indicator-indicatorContainer" aria-hidden="true">
                  <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="indicator-Svg">
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
            {ver == "GL" ? "" :
              hide == false ? "" :
                <div className="leveltext__menu2 menu_selector-list zindex998">
                  <div className="typetext__menu-list menu_selector-MenuList">
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "By Character" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/characterlist/`}
                    >
                      {"By Character"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Game List" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/gamelist/`}
                    >
                      {"Game List"}
                    </Link>
                    <div className='typetext__option menu_option-MenuList nopointer'>
                      ⇩ Advance use only! ⇩
                    </div>
                    {
                    //<Link
                    //  className={`typetext__option menu_option-MenuList ${loc == "File List" ? "leveltext__option--is-selected" : ""}`}
                    //  to={`/JP/filelist/`}
                    //>
                    //  {"File List"}
                    //</Link>
                    }
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Ailments" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/ailments/`}
                    >
                      {"Ailments"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Character Abilities" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/charability/`}
                    >
                      {"Character Abilities"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Character Passives" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/characterpassives/`}
                    >
                      {"Character Passives"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Enemy Abilities" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/enemyabilities/`}

                    >
                      {"Enemy Abilities"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Summon Abilities" ? "leveltext__option--is-selected" : ""}`}
                      to={`/JP/summons/`}
                    >
                      {"Summon Abilities"}
                    </Link>
                  </div>
                </div>
            }
            {ver == "JP" ? "" :
              hide == false ? "" :
                <div className="leveltext__menu2 menu_selector-list zindex998">
                  <div className="typetext__menu-list menu_selector-MenuList">
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "By Character" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/characterlist/`}
                    >
                      {"By Character"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Game List" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/gamelist/`}
                    >
                      {"Game List"}
                    </Link>
                    <div className='typetext__option menu_option-MenuList nopointer'>
                      ⇩ Advance use only! ⇩
                    </div>
                    {
                    //<Link
                    //  className={`typetext__option menu_option-MenuList ${loc == "File List" ? "leveltext__option--is-selected" : ""}`}
                    //  to={`/GL/filelist/`}
                    //>
                    //  {"File List"}
                    //</Link>
                    }
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Ailments" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/ailments/`}
                    >
                      {"Ailments"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Character Abilities" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/charability/`}
                    >
                      {"Character Abilities"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Character Passives" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/characterpassives/`}
                    >
                      {"Character Passives"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Enemy Abilities" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/enemyabilities/`}

                    >
                      {"Enemy Abilities"}
                    </Link>
                    <Link
                      className={`typetext__option menu_option-MenuList ${loc == "Summon Abilities" ? "leveltext__option--is-selected" : ""}`}
                      to={`/GL/summons/`}
                    >
                      {"Summon Abilities"}
                    </Link>
                  </div>
                </div>
            }
          </div>
          <br />
          <SubCategories
            ver={ver}
            loc={loc}
            file={file}
          />
          <DataHandOff
            //indexes
            ver={ver}
            loc={loc}
            file={file}
            newcompare={newcompare}
            match={match}

            master_index={master_index
            }
            enemy_names={enemy_names}

            Access={Access}
            //APIs
            ailment_data={ailment_data}
            ailment_group={ailment_group}
            command_group={command_group}
            ailment_rank={ailment_rank}
            ailment_cast={ailment_cast}
            ailment_field={ailment_field}
            ailment_field_effects={ailment_field_effects}
            ailment_default={ailment_default}
            ailment_level_condition={ailment_level_condition}
            cond_data={cond_data}
            file_list={file_list}
            ailment_combination={ailment_combination}
            ailment_modify={ailment_modify}
            passive_ability={passive_ability}
            equipment_passive_ability={equipment_passive_ability}
            art_passive={art_passive}
            link_eff_data={link_eff_data}
            hit_data={hit_data}
            enemy_resist={enemy_resist}
            command_ability={command_ability}
            character_option={character_option}
            enemy_option={enemy_option}
            character_ability={character_ability}
            enemy_ability={enemy_ability}
            summon_ability={summon_ability}

            gamelist_ailment={gamelist_ailment}
            gamelist_ability={gamelist_ability}
            gamelist_passive={gamelist_passive}
            gamelist_sphere={gamelist_sphere}
            gamelist_gear={gamelist_gear}
          />
        </div>
      </div>
    </div>
  )
}
export default Categories