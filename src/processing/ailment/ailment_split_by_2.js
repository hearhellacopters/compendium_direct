export default function ailment_split_by_2(cutype, value){
    var valuepars = value == undefined ? 0 : value
    switch (cutype) {
        case 1:
            //9th number
            valuepars = Math.floor(value / 100000000);
            break;
        case 2:
            //8th & 7th
            valuepars = Math.floor((value % 100000000) / 1000000);
            break;
        case 3:
            //6th & 5th
            valuepars = Math.floor((value % 1000000) / 10000);
            break;
        case 4:
            //4th & 3rd
            valuepars = Math.floor((value % 10000) / 100);
            break;
        case 5:
            //2nd & 1st
            valuepars = Math.floor(value % 100);
            break;
        default:
            break;
    } 
    return valuepars
}