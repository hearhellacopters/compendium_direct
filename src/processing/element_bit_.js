const element_bit = (
    value
) => {
    var remain = value
    var output = ""
    if (remain >= 512) {
        remain = remain - 512
        output = `<Holy>${output}`
    }
    if (remain >= 256) {
        remain = remain - 256
        output = `<Dark>${output}`
    }
    if (remain >= 128) {
        remain = remain - 128
        output = `<Water>${output}`
    }
    if (remain >= 64) {
        remain = remain - 64
        output = `<Earth>${output}`
    }
    if (remain >= 32) {
        remain = remain - 32
        output = `<Wind>${output}`
    }
    if (remain >= 16) {
        remain = remain - 16
        output = `<Thunder>${output}`
    }
    if (remain >= 8) {
        remain = remain - 8
        output = `<Ice>${output}`
    }
    if (remain >= 4) {
        remain = remain - 4
        output = `<Fire>${output}`
    }
    if (remain >= 2) {
        remain = remain - 2
        output = `Non-Elemental ${output}`
    }
    return (
        output
    )
}
export default element_bit