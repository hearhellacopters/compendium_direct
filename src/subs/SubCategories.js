import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const SubCategories = ({ ver, loc, file }) => {

  const [hide, sethide] = useState(false);

  const hidebutton = () => {
    sethide((prevValue) => !prevValue);
  }

  if (loc == "Character Passives") {
    return (
      <div className="subdropmenu">
        <div className="levelcontainerDev select-container" onClick={hidebutton}>
          <div className="leveltext__control select-container-control">
            <div className="leveltext__value-container selectvalue-ValueContainer">
              <div className="leveltext__single-value selectvalue-singleValue">
                {file}
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
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "passive_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/characterpassives/passive_ability/compare`}
                  >
                    {"passive_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "equipment_passive_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/characterpassives/equipment_passive_ability/compare`}
                  >
                    {"equipment_passive_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "art_passive" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/characterpassives/art_passive/compare`}
                  >
                    {"secret_passive_effect"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "link_eff_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/characterpassives/link_eff_data/compare`}
                  >
                    {"link_eff_data"}
                  </Link>
                </div>
              </div>
          }
          {ver == "JP" ? "" :
            hide == false ? "" :
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "passive_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/characterpassives/passive_ability/compare`}
                  >
                    {"passive_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "equipment_passive_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/characterpassives/equipment_passive_ability/compare`}
                  >
                    {"equipment_passive_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "art_passive" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/characterpassives/art_passive/compare`}
                  >
                    {"secret_passive_effect"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "link_eff_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/characterpassives/link_eff_data/compare`}
                  >
                    {"link_eff_data"}
                  </Link>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
  if (loc == "Ailments") {
    return (
      <div className="subdropmenu">
        <div className="levelcontainerDev select-container" onClick={hidebutton}>
          <div className="leveltext__control select-container-control">
            <div className="leveltext__value-container selectvalue-ValueContainer">
              <div className="leveltext__single-value selectvalue-singleValue">
                {file}
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
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_data/compare`}
                  >
                    {"ailment_data"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_default" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_default/compare`}
                  >
                    {"default_ailment"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_cast" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_cast/compare`}
                  >
                    {"ailment_cast"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_group" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_group/compare`}
                  >
                    {"ailment_group"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "condition_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/condition_data/compare`}
                  >
                    {"condition_data"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_modify" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_modify/compare`}
                  >
                    {"ailment_modify"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_field" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_field/compare`}
                  >
                    {"battle_field_effect_require w/ effects"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_field_effects" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_field_effects/compare`}
                  >
                    {"battle_field_effects"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_rank" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_rank/compare`}
                  >
                    {"ailment_rank"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_combination" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_combination/compare`}
                  >
                    {"ailment_combination"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_level_condition" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/ailments/ailment_level_condition/compare`}
                  >
                    {"ailment_level_condition"}
                  </Link>
                </div>
              </div>
          }
          {ver == "JP" ? "" :
            hide == false ? "" :
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_data/compare`}
                  >
                    {"ailment_data"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_default" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_default/compare`}
                  >
                    {"default_ailment"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_cast" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_cast/compare`}
                  >
                    {"ailment_cast"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_group" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_group/compare`}
                  >
                    {"ailment_group"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "condition_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/condition_data/compare`}
                  >
                    {"condition_data"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_modify" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_modify/compare`}
                  >
                    {"ailment_modify"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_field" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_field/compare`}
                  >
                    {"battle_field_effect_require w/ effects"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_field_effects" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_field_effects/compare`}
                  >
                    {"battle_field_effects"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_rank" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_rank/compare`}
                  >
                    {"ailment_rank"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_combination" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_combination/compare`}
                  >
                    {"ailment_combination"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ailment_level_condition" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/ailments/ailment_level_condition/compare`}
                  >
                    {"ailment_level_condition"}
                  </Link>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
  if (loc == "Character Abilities") {
    return (
      <div className="subdropmenu">
        <div className="levelcontainerDev select-container" onClick={hidebutton}>
          <div className="leveltext__control select-container-control">
            <div className="leveltext__value-container selectvalue-ValueContainer">
              <div className="leveltext__single-value selectvalue-singleValue">
                {file}
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
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "character_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/charability/character_ability/compare`}
                  >
                    {"character_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ability_hit_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/charability/ability_hit_data/compare`}
                  >
                    {"ability_hit_data"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "command_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/charability/command_ability/compare`}
                  >
                    {"command_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "character_option" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/charability/character_option/compare`}
                  >
                    {"character_option"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "command_ability_group" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/charability/command_ability_group/compare`}
                  >
                    {"command_ability_group"}
                  </Link>
                </div>
              </div>
          }
          {ver == "JP" ? "" :
            hide == false ? "" :
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "character_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/charability/character_ability/compare`}
                  >
                    {"character_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "ability_hit_data" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/charability/ability_hit_data/compare`}
                  >
                    {"ability_hit_data"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "command_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/charability/command_ability/compare`}
                  >
                    {"command_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "character_option" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/charability/character_option/compare`}
                  >
                    {"character_option"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "command_ability_group" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/charability/command_ability_group/compare`}
                  >
                    {"command_ability_group"}
                  </Link>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
  if (loc == "Enemy Abilities") {
    return (
      <div className="subdropmenu">
        <div className="levelcontainerDev select-container" onClick={hidebutton}>
          <div className="leveltext__control select-container-control">
            <div className="leveltext__value-container selectvalue-ValueContainer">
              <div className="leveltext__single-value selectvalue-singleValue">
                {file}
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
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "enemy_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/enemyabilities/enemy_ability/compare`}
                  >
                    {"enemy_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "enemy_option" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/enemyabilities/enemy_option/compare`}
                  >
                    {"enemy_option"}
                  </Link>
                </div>
              </div>
          }
          {ver == "JP" ? "" :
            hide == false ? "" :
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "enemy_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/enemyabilities/enemy_ability/compare`}
                  >
                    {"enemy_ability"}
                  </Link>
                  <Link className={`typetext__option menu_option-MenuList ${file == "enemy_option" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/enemyabilities/enemy_option/compare`}
                  >
                    {"enemy_option"}
                  </Link>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
  if (loc == "Summon Abilities") {
    return (
      <div className="subdropmenu">
        <div className="levelcontainerDev select-container" onClick={hidebutton}>
          <div className="leveltext__control select-container-control">
            <div className="leveltext__value-container selectvalue-ValueContainer">
              <div className="leveltext__single-value selectvalue-singleValue">
                {file}
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
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "summon_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/JP/summons/summon_ability/new`}
                  >
                    {"summon_ability"}
                  </Link>
                </div>
              </div>
          }
          {ver == "JP" ? "" :
            hide == false ? "" :
              <div className="leveltext__menu menu_selector-list zindex997">
                <div className="typetext__menu-list menu_selector-MenuList">
                  <Link className={`typetext__option menu_option-MenuList ${file == "summon_ability" ? " leveltext__option--is-selected" : ""}`}
                    to={`/GL/summons/summon_ability/new`}
                  >
                    {"summon_ability"}
                  </Link>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }

  if (loc == "File List") {
    return (
      ""
    )
  }
  if (loc == "By Character") {
    return (
      ""
    )
  }
  if (loc == "Game List") {
    return (
      ""
    )
  }
}
export default SubCategories