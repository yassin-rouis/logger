"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("./Utils"));
const Parser_1 = __importDefault(require("./Parser"));
// TYPES ===========================================
var Level;
(function (Level) {
    Level[Level["VERBOSE"] = 10] = "VERBOSE";
    Level[Level["DEBUG"] = 20] = "DEBUG";
    Level[Level["LOG"] = 30] = "LOG";
    Level[Level["INFO"] = 40] = "INFO";
    Level[Level["SUCCESS"] = 35] = "SUCCESS";
    Level[Level["WARN"] = 50] = "WARN";
    Level[Level["ERROR"] = 60] = "ERROR";
    Level[Level["FATAL"] = 70] = "FATAL";
})(Level || (Level = {}));
// LOGGER ==========================================
class Logger {
    #loggingLevel;
    static #defaultTheme = {
        verbose: {
            level: Level.VERBOSE,
            label: "VERBOSE",
            style: {
                icon: { fore: "gray", back: undefined, style: undefined },
                time: { fore: "grey", back: "black", style: undefined },
                type: { fore: "grey", back: undefined, style: "italic" },
                text: { fore: "grey", back: undefined, style: "italic" }
            },
        },
        log: {
            level: Level.LOG,
            label: "LOG",
            style: {
                icon: { fore: "white", back: undefined, style: undefined },
                time: { fore: "white", back: "black", style: undefined },
                type: { fore: "white", back: "grey", style: undefined },
                text: { fore: "grey", back: undefined, style: undefined }
            }
        },
        info: {
            level: Level.INFO,
            label: "INFO",
            icon: "•",
            style: {
                icon: { fore: "blue", back: undefined, style: undefined },
                time: { fore: "white", back: "black", style: undefined },
                type: { fore: "white", back: "grey", style: undefined },
                text: { fore: "grey", back: undefined, style: undefined }
            },
        },
        success: {
            level: Level.SUCCESS,
            label: "SUCCESS",
            icon: "✔",
            style: {
                icon: { fore: "brightGreen", back: undefined, style: undefined },
                time: { fore: "brightWhite", back: "black", style: undefined },
                type: { fore: "brightWhite", back: "brightGreen", style: undefined },
                text: { fore: "brightGreen", back: undefined, style: undefined }
            }
        },
        warn: {
            level: Level.WARN,
            label: "WARN",
            icon: "⚠",
            style: {
                icon: { fore: "brightYellow", back: undefined, style: undefined },
                time: { fore: "brightYellow", back: "black", style: undefined },
                type: { fore: "brightWhite", back: "brightYellow", style: undefined },
                text: { fore: "brightYellow", back: undefined, style: undefined }
            }
        },
        error: {
            level: Level.ERROR,
            label: "ERROR",
            icon: "🞪",
            style: {
                icon: { fore: "brightRed", back: undefined, style: undefined },
                time: { fore: "brightRed", back: "black", style: undefined },
                type: { fore: "brightWhite", back: "brightRed", style: undefined },
                text: { fore: "brightRed", back: undefined, style: undefined }
            }
        },
        fatal: {
            level: Level.FATAL,
            label: "FATAL",
            icon: "🞪",
            style: {
                icon: { fore: "brightRed", back: undefined, style: undefined },
                time: { fore: "brightWhite", back: "brightRed", style: undefined },
                type: { fore: "brightWhite", back: "brightRed", style: undefined },
                text: { fore: "brightWhite", back: "brightRed", style: undefined }
            }
        }
    };
    constructor({ level = Level.LOG, clear = true } = {}) {
        this.#loggingLevel = level;
        if (clear)
            process.stdout.write('\x1Bc');
        for (let logging in Logger.#defaultTheme) {
            Logger.#defineLoggingLevel(this, logging, Logger.#defaultTheme[logging]);
        }
    }
    setLevel(value) {
        this.#loggingLevel = value;
    }
    getLevel() {
        return this.#loggingLevel;
    }
    // STATIC FUNCTIONS ---------------------------------------
    static #defineLoggingLevel(instance, name, settings) {
        // @ts-ignore
        if (typeof instance[name] != "undefined")
            throw new Error(`${name} is not a valid logging theme.`);
        // @ts-ignore
        instance[name] = (...obj) => {
            if (instance.getLevel() <= settings.level)
                Logger.#logParts(settings.level, (settings.icon && settings.icon.length > 0 && settings.icon[0]) || " ", settings.label, obj, settings.style);
        };
    }
    static clear() {
        process.stdout.write('\x1Bc');
    }
    static #color(text, dp) {
        if (dp) {
            if (dp.fore)
                text = Utils_1.default.fore(text, dp.fore);
            if (dp.back)
                text = Utils_1.default.back(text, dp.back);
            if (dp.style)
                text = Utils_1.default.fore(text, dp.style);
        }
        return text;
    }
    static #logParts(logLevel, icon, logType, parts, displayColors) {
        // if(logLevel < this.#loggingLevel) return;
        let lines = [];
        let color = ":";
        color = this.#color(color, displayColors?.text);
        let colorPrefix = color.split(":")[0];
        let colorSuffix = color.split(":")[1];
        for (let part of parts) {
            let partLines = [];
            if (typeof part === 'string') {
                partLines = part.split('\n');
            }
            else {
                let parsedPart = Parser_1.default.parseAny(part, true, 5, 0);
                partLines = parsedPart.split('\n');
            }
            for (let i = 0; i < partLines.length; i++) {
                if (i == 0 && lines.length != 0) {
                    lines[lines.length - 1] += colorPrefix + " " + partLines[i] + colorSuffix;
                }
                else {
                    lines.push(colorPrefix + partLines[i] + colorSuffix);
                }
            }
        }
        this.#logLines(logLevel, icon, logType, lines, displayColors);
    }
    static #logLines(logLevel, icon, logType, lines, displayColors) {
        //if(logLevel < this.#loggingLevel) return;
        let multiline = lines.length > 1;
        // |•  [01/10/2000 05:30:20] [V] MESSAGE
        // ^^  ^~~~~~~~~~~~~~~~~~~~^ ^~^ ^~~~~~^
        // ||  |                     |   +- texte
        // ||  |                     +- logType
        // ||  +- Date and time
        // |+- icon
        // +- logIcon
        for (let i = 0; i < lines.length; i++) {
            Logger.#logLine(multiline, i == 0, i == 0 ? (icon != " " ? icon : (multiline ? "┭" : " ")) : i == lines.length - 1 ? "╰" : "│", logType, lines[i], displayColors);
        }
    }
    static #logLine(isMultiline, isPrimary, icon, logType, text, displayColors) {
        let timePrefix = " " + (new Date()).toLocaleString() + " ";
        let li = isPrimary ? isMultiline ? "┣" : "┃" : "┋";
        let ic = icon[0] || " ";
        let ti = isPrimary ? timePrefix : " ".repeat(timePrefix.length);
        let ty = " " + (logType[0] || "?") + " ";
        let tx = text;
        li = this.#color(li, displayColors?.icon);
        ic = this.#color(ic, displayColors?.icon);
        ti = this.#color(ti, displayColors?.time);
        ty = this.#color(ty, displayColors?.type);
        console.log(`${li} ${ic} ${ti} ${ty} ${tx}`);
    }
}
module.exports = Logger;
exports.default = Logger;
