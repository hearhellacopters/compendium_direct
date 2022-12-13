export default function between_10(num) {
    if (num <= 1 || num == undefined) {
        return 1
    }
    if (num >= 10) {
        return 10
    }
    if (num <= 9) {
        return num
    }
}