export default function isJson(item, logitem) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        console.log("Invalid JSON:", item, e)
        console.log(logitem)
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }
    console.log("Invalid JSON:", item)
    console.log(logitem)
    return false;
}