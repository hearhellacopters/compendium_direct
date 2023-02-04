import counter from './hit_data_count/counter.js'

const counts_handler = (hitfull) => {

    for (let index = 1; index < 41; index++) {
        const hit_1 = `hit_${index}`
        const hit_2 = `hit_${index + 1}`
        const hit_3 = `hit_${index + 2}`
        const hit_4 = `hit_${index + 3}`
        const hit_5 = `hit_${index + 4}`
        const hit_6 = `hit_${index + 5}`
        const hit_7 = `hit_${index + 6}`
        const hit_8 = `hit_${index + 7}`
        const hit_9 = `hit_${index + 8}`
        const hit_10 = `hit_${index + 9}`
        const hit_11 = `hit_${index + 10}`
        const hit_12 = `hit_${index + 11}`
        const hit_13 = `hit_${index + 12}`
        const hit_14 = `hit_${index + 13}`
        const hit_15 = `hit_${index + 14}`
        const hit_16 = `hit_${index + 15}`
        const hit_17 = `hit_${index + 16}`
        const hit_18 = `hit_${index + 17}`
        const hit_19 = `hit_${index + 18}`
        const hit_20 = `hit_${index + 19}`
        const hit_21 = `hit_${index + 20}`
        const hit_22 = `hit_${index + 21}`
        const hit_23 = `hit_${index + 22}`
        const hit_24 = `hit_${index + 23}`
        const hit_25 = `hit_${index + 24}`
        const hit_26 = `hit_${index + 25}`
        const hit_27 = `hit_${index + 26}`
        const hit_28 = `hit_${index + 27}`
        const hit_29 = `hit_${index + 28}`
        const hit_30 = `hit_${index + 29}`
        const hit_31 = `hit_${index + 30}`
        const hit_32 = `hit_${index + 31}`
        const hit_33 = `hit_${index + 32}`
        const hit_34 = `hit_${index + 33}`
        const hit_35 = `hit_${index + 34}`
        const hit_36 = `hit_${index + 35}`
        const hit_37 = `hit_${index + 36}`
        const hit_38 = `hit_${index + 37}`
        const hit_39 = `hit_${index + 38}`
        const hit_40 = `hit_${index + 39}`

        const loop = [
            40,
            39,
            38, 
            37, 
            36, 
            35, 
            34, 
            33, 
            32, 
            31, 
            30, 
            29, 
            28, 
            27, 
            26, 
            25, 
            24, 
            23, 
            22, 
            21, 
            20, 
            19, 
            18, 
            17, 
            16, 
            15, 
            14, 
            13, 
            12, 
            11, 
            10, 
            9, 
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            ].forEach(i=>{
            counter(
                i,
                hitfull[hit_1],
                hitfull[hit_2],
                hitfull[hit_3],
                hitfull[hit_4],
                hitfull[hit_5],
                hitfull[hit_6],
                hitfull[hit_7],
                hitfull[hit_8],
                hitfull[hit_9],
                hitfull[hit_10],
                hitfull[hit_11],
                hitfull[hit_12],
                hitfull[hit_13],
                hitfull[hit_14],
                hitfull[hit_15],
                hitfull[hit_16],
                hitfull[hit_17],
                hitfull[hit_18],
                hitfull[hit_19],
                hitfull[hit_20],
                hitfull[hit_21],
                hitfull[hit_22],
                hitfull[hit_23],
                hitfull[hit_24],
                hitfull[hit_25],
                hitfull[hit_26],
                hitfull[hit_27],
                hitfull[hit_28],
                hitfull[hit_29],
                hitfull[hit_30],
                hitfull[hit_31],
                hitfull[hit_32],
                hitfull[hit_33],
                hitfull[hit_34],
                hitfull[hit_35],
                hitfull[hit_36],
                hitfull[hit_37],
                hitfull[hit_38],
                hitfull[hit_39],
                hitfull[hit_40],
            )
        })
        
    }

    return (
        hitfull
    )
}
export default counts_handler