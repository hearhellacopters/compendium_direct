import React, { useState, useEffect } from 'react';

const Capped = ({
    text
}) => {

    const len = text == undefined ? 1 : text.replace(/ /, "").length

    return (
        <svg
            style={{ width: `${len + .8}ch` }}
            className='rainbow_tag'
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
        >
            <text
                className='clean'
                fill="url(#rainbow)">
                <tspan x="1" dy="18">{text}</tspan>
            </text>
            <defs>
                <linearGradient id="rainbow" x1="0" x2="0" y1="0" y2="100%" >
                    <stop stopColor="#2767DC" offset="0%" />
                    <stop stopColor="#51F7FE" offset="20%" />
                    <stop stopColor="#21B533" offset="40%" />
                    <stop stopColor="#EAFC37" offset="60%" />
                    <stop stopColor="#FF7B21" offset="80%" />
                    <stop stopColor="#FF5447" offset="100%" />
                </linearGradient>
            </defs>
        </svg>
    )
}
export default Capped