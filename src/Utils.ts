import colors from "colors/safe";

class Utils {
    // public static getTimePrefix() {
    //     return " " + (new Date()).toLocaleString() + " ";
    // }

    public static fore(text: string, color: string) {
        if (Object.hasOwn(colors, color)) {
            // @ts-ignore
            return colors[color](text)
        } else {
            throw new Error(`Couleur ${color} non définie !`)
        }
    }

    public static back(text: string, color: string) {
        color = "bg" + color[0].toUpperCase() + color.substring(1)
        if (Object.hasOwn(colors, color)) {
            // @ts-ignore
            return colors[color](text)
        } else {
            throw new Error(`Couleur de fond ${color} non définie !`)
        }
    }
}

module.exports = Utils
export default Utils;