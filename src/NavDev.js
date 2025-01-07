import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Switch, useLocation } from 'react-router-dom'

export default function NavDev() {

    const location = useLocation()

    const name = location.pathname.substring(1).split('/')[0];

    const [current, setcurrent] = useState(name);
    const [hide, sethide] = useState(false);

    useEffect(() => {
        if (name == "") {
            setcurrent("Home")
        }
        if (name == "tools") {
            setcurrent("Tools")
        }
        if (name == "GL") {
            setcurrent("GL")
        }
        if (name == "JP") {
            setcurrent("JP")
        }
        if (name == "blog") {
            setcurrent("Blog")
        }
        if (name == null) {
            setcurrent("Home")
        }
    }, [location, name])

    const hidebutton = () => {
        sethide((prevValue) => !prevValue);
    }

    return (
        <div className="newmenu">
            <div className="levelcontainerDev select-containerDev" onClick={hidebutton}>
                <div className="leveltext__control select-container-control">
                    <div className="leveltext__value-container selectvalue-ValueContainer">
                        <div className="leveltext__single-value selectvalue-singleValue">
                            {current == "/tools" ? "Tools" : current}
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
                {hide == false ? "" :
                    <div className="leveltext__menu menu_selector-list zindex999">
                        <div className="typetext__menu-list menu_selector-MenuList">
                            <Link
                                className={`typetext__option menu_option-MenuList ${current == "JP" ? "leveltext__option--is-selected" : ""}`}
                                to={`/JP`}
                            >
                                JP - Direct
                            </Link>
                        </div>
                        <div className="typetext__menu-list menu_selector-MenuList">
                            <Link
                                className={`typetext__option menu_option-MenuList ${current == "GL" ? "leveltext__option--is-selected" : ""}`}
                                to={`/GL`}
                            >
                                GL - Direct
                            </Link>
                        </div>
                        <div className="typetext__menu-list menu_selector-MenuList">
                            <Link
                                className={`typetext__option menu_option-MenuList ${current == "Tools" ? "leveltext__option--is-selected" : ""}`}
                                to={`/tools`}
                            >
                                Tools
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}