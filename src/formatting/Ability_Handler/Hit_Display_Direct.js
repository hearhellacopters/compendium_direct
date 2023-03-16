import React, { useState, useEffect } from "react";
import replacer from '../../processing/replacer_abilitycontent'
import Hit_Data_Pars from "./Hit_Data_Pars";

const Hit_Handler_Direct = ({
    command_meta,
    showai,
    showmeraw
}) => {

    const Meta = command_meta && command_meta.Meta

    const hit_map = {}

    command_meta && command_meta.hit_data && command_meta.hit_data.forEach(self => {
        Object.assign(hit_map, { [self.hit_num]: self })
    })

    const cast_list = {}

    command_meta && command_meta.cast_hit && command_meta.cast_hit.forEach(self => {
        if (cast_list[self.hit] == undefined) {
            Object.assign(cast_list, { [self.hit]: [self] })
        } else {
            cast_list[self.hit].push(self)
        }
    })

    const hit_count_map = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
    ]

    return (
        <div>
            {Meta && Meta.note != undefined ?
                <div className="subpassiveflair">
                    {command_meta.Meta.note.split(/\n/gm).map((value, i) =>
                        <div key={i}>{replacer(`${value}`)}</div>
                    )}
                </div>
                : ""}
            {hit_map[`B1`] != undefined && hit_map[`B1`].show != false ?
                <Hit_Data_Pars
                    key={`B1`}
                    hit_data={hit_map[`B1`]}


                />
                : ""}

            {hit_map[`B2`] != undefined && hit_map[`B2`].show != false ?
                <Hit_Data_Pars
                    key={`B2`}
                    hit_data={hit_map[`B2`]}


                />
                : ""}

            {hit_map[`B3`] != undefined && hit_map[`B3`].show != false ?
                <Hit_Data_Pars
                    key={`B3`}
                    hit_data={hit_map[`B3`]}


                />
                : ""}

            {hit_map[`B4`] != undefined && hit_map[`B4`].show != false ?
                <Hit_Data_Pars
                    key={`B4`}
                    hit_data={hit_map[`B4`]}


                />
                : ""}

            {cast_list[-1] != undefined ?
                cast_list[-1].map(self => (
                    <div key={self.id}>
                        {self.cond != undefined ? `┬ ` : ""}{replacer(self.cond, "tl")}
                        {self.cond != undefined ? <br /> : ""}
                        {self.cond != undefined ? `└─ ` : ""}{replacer(self.cast_str, "tl")}
                    </div>
                ))
                : ""}

            {hit_count_map.map(number => (
                <div key={number}>
                    {cast_list[number] && cast_list[number].map(self => (
                        <div key={self.id}>
                            {self.cond != undefined ? `┬ ` : ""}{replacer(self.cond, "tl")}
                            {self.cond != undefined ? <br /> : ""}
                            {self.cond != undefined ? `└─ ` : ""}{replacer(self.cast_str, "tl")}
                        </div>
                    ))}
                    {hit_map[number] != undefined && hit_map[number].show != false ?
                        <Hit_Data_Pars
                            key={number}
                            hit_data={hit_map[number]}
                        />
                        : ""}
                </div>
            ))}

            {cast_list[0] != undefined ?
                cast_list[0].map(self => (
                    <div key={self.id}>
                        {self.cond != undefined ? `┬ ` : ""}{replacer(self.cond, "tl")}
                        {self.cond != undefined ? <br /> : ""}
                        {self.cond != undefined ? `└─ ` : ""}{replacer(self.cast_str, "tl")}
                    </div>
                ))
                : ""}

            {//Meta && Meta.faf != undefined ?
            //    <div>
            //        {replacer(Meta && Meta.faf)}
            //    </div>
            //    : ""}
            }
            {Meta && Meta.bdlur != undefined ?
                <div>
                    {replacer(Meta && Meta.bdlur)}
                </div>
                : ""}
            {Meta && Meta.mblur != undefined ?
                <div>
                    {replacer(Meta && Meta.mblur)}
                </div>
                : ""}
            {
            //{Meta && Meta.kcon != undefined ?
            //    <div>
            //        {replacer(Meta && Meta.kcon)}
            //    </div>
            //    : ""}
            //{Meta && Meta.kcon_1 != undefined ?
            //    <div>
            //        {replacer(Meta && Meta.kcon_1)}
            //    </div>
            //    : ""}
            //{Meta && Meta.kid != undefined ?
            //    <div>
            //        {replacer(Meta && Meta.kcon)}
            //    </div>
            //    : ""}
            //{Meta && Meta.kid_1 != undefined ?
            //    <div>
            //        {replacer(Meta && Meta.kcon_1)}
            //    </div>
            //    : ""}
            }

            {Meta && Meta.cost != undefined ?
                Meta.cost == "*Instant Turn Rate" ?
                    <div>
                        {replacer(Meta && Meta.cost)}
                    </div>
                    : ""
                : ""}

            {Meta && Meta.cost != undefined ?
                Meta.cost != "*Instant Turn Rate" ?
                    <div>
                        {replacer(Meta && Meta.cost)}
                    </div>
                    : ""
                : ""}

            {Meta && Meta.nasp != undefined ?
                <div>
                    {replacer(Meta && Meta.nasp)}
                </div>
                : ""}
            {Meta && Meta.nex != undefined ?
                <div>
                    {replacer(Meta && Meta.nex)}
                </div>
                : ""}
            {Meta && Meta.nsum != undefined ?
                <div>
                    {replacer(Meta && Meta.nsum)}
                </div>
                : ""}
            {Meta && Meta.nabi != undefined ?
                <div>
                    {replacer(Meta && Meta.nabi)}
                </div>
                : ""}
            {Meta && Meta.exshow != undefined ?
                <div>
                    {replacer(Meta && Meta.exshow)}
                </div>
                : ""}
            {Meta && Meta.ncharge != undefined ?
                <div>
                    {replacer(Meta && Meta.ncharge)}
                </div>
                : ""}

            {showmeraw == true ?
                <div>
                    {Meta && Meta.type_ != undefined ?
                        <div>
                            {replacer(Meta && Meta.type_)}
                        </div>
                        : ""}
                    {Meta && Meta.target_range_ != undefined ?
                        <div>
                            {replacer(Meta && Meta.target_range_)}
                        </div>
                        : ""}
                    {Meta && Meta.target_type_ != undefined ?
                        <div>
                            {replacer(Meta && Meta.target_type_)}
                        </div>
                        : ""}
                    {Meta && Meta.auto_target_type_ != undefined ?
                        <div>
                            {replacer(Meta && Meta.auto_target_type_)}
                        </div>
                        : ""}
                    {Meta && Meta.show != undefined ?
                        <div>
                            {replacer(Meta && Meta.show)}
                        </div>
                        : ""}
                    {Meta && Meta.showadd != undefined ?
                        <div>
                            {replacer(Meta && Meta.showadd)}
                        </div>
                        : ""}
                </div>
                : ""}
        </div>
    )
}
export default Hit_Handler_Direct