import React, { useState, useEffect } from 'react';

const BrevityProfile = ({
    match,
    asset,
    ver
}) => {

    const charid = match.chara_id
    const unit_id = match.unit_type_id
    const assetmod = match.name == "Cloud" || match.name == "Terra" ? asset + 1 : asset - 1

    const artwork = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_chara_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(charid - 1).padStart(4, '0')}.g1t.dz`
    const weaponbacking = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_wpn_chara_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(charid - 1).padStart(4, '0')}.g1t.dz`
    const texture = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/CT_${String(unit_id).padStart(4, '0')}${asset == 1 ? "" : String(assetmod).padStart(2, '0')}.g1t.dz`
    const model = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/CM_${String(unit_id).padStart(4, '0')}${asset == 1 ? "" : String(assetmod).padStart(2, '0')}.g1m.dz`
    const animation = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/MOT_${String(unit_id).padStart(4, '0')}${asset == 1 ? "" : String(assetmod).padStart(2, '0')}.bin.dz`
    const facecard = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_chara_face_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(charid - 1).padStart(4, '0')}.g1t.dz`
    const turnordericon = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_chara_btl_ctb_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(match.still_id).padStart(4, '0')}.g1t.dz`
    const battleface = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_chara_btl_status_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(match.still_id).padStart(4, '0')}.g1t.dz`
    const talkevent = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_chara_event_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(match.still_id).padStart(4, '0')}.g1t.dz`
    const audio = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/AV${String(unit_id).padStart(3, '0')}_b.sbin`
    const eventaudio = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/EV${String(unit_id).padStart(3, '0')}_b.sbin`
    const effects = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/_EffChr${String(unit_id).padStart(3, '0')}.bin.dz`
    const attached = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/EffAttachData_${String(unit_id).padStart(4, '0')}.bin.dz`

    const bursticon = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/stl_chara_burst_0${asset == 1 ? 0 : asset}0${asset == 1 ? 0 : 1}${String(charid - 1).padStart(4, '0')}.g1t.dz`
    const burstbgm = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/BGM${String(match.burst_bgm_id).padStart(3, '0')}.sbin`
    const burstwin = `http://cache-game.${ver == "GL" ? "g." : ""}dissidiaff-oo.com/resource/Android/0000/BGM${String(match.bw_bgm_id).padStart(3, '0')}.sbin`

    return (
        <div className="brevityholder">
            <div className={`brevcell Abase`}>
                <span className="subtext">Assets:</span><span className="infolocation subtext">{" (based on version & selected costume)"}</span>
                <div className="subpassiveflair ">

                </div>
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={artwork}>
                    Artwork
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={facecard}>
                    Facecard
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={turnordericon}>
                    Turn Order Icon
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={battleface}>
                    Battle Face
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={talkevent}>
                    Talk Face
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={weaponbacking}>
                    Weapon Backing
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={texture}>
                    Texture
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={model}>
                    Model
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={animation}>
                    Animations
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={audio}>
                    Audio
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={eventaudio}>
                    Event Audio
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={effects}>
                    Effects
                </a>
                <br />
                <a className="unique" rel="noreferrer noopener" target="_blank" download href={attached}>
                    Attached
                </a>
                {match.burst_bgm_id != 0 ?
                    <div>
                        <a className="unique" rel="noreferrer noopener" target="_blank" download href={bursticon}>
                            Burst Icon
                        </a>
                        <br />
                        <a className="unique" rel="noreferrer noopener" target="_blank" download href={burstbgm}>
                            Burst Music
                        </a>
                        <br />
                        <a className="unique" rel="noreferrer noopener" target="_blank" download href={burstwin}>
                            Burst Win Music
                        </a>
                    </div>
                    : ""}
            </div>
        </div>
    )
}

export default BrevityProfile