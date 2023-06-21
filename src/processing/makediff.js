import {diffTrimmedLines} from 'diff';

export default function makediff (oldText, newText) {
    const JPDESCREPLACE = diffTrimmedLines(oldText + "\n", newText + "\n", { newlineIsToken: false })
    const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~' : ""}${text.removed == true ? '^^' + text.value + '^.^' : ""}${text.removed == undefined && text.added == undefined ? text.value : ""}`).join("")
    return (
        output
    )
}