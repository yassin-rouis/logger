"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
class Utils {
    // public static getTimePrefix() {
    //     return " " + (new Date()).toLocaleString() + " ";
    // }
    static fore(text, color) {
        if (Object.hasOwn(safe_1.default, color)) {
            // @ts-ignore
            return safe_1.default[color](text);
        }
        else {
            throw new Error(`Couleur ${color} non définie !`);
        }
    }
    static back(text, color) {
        color = "bg" + color[0].toUpperCase() + color.substring(1);
        if (Object.hasOwn(safe_1.default, color)) {
            // @ts-ignore
            return safe_1.default[color](text);
        }
        else {
            throw new Error(`Couleur de fond ${color} non définie !`);
        }
    }
}
module.exports = Utils;
exports.default = Utils;
