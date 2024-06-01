const colors = require("colors/safe")
process.stdout.write('\x1Bc')

class Logger {
    static hasIcons = true;
    static colored = true;

    static objectsToString(...objects) {
        let text = []
        for(let obj of objects) {
            text.push(obj.toString())
        }

        return text.join(" ")
    }

    static $getTimePrefix() {
        return " " + (new Date()).toLocaleString() + " ";
    }

    /**
     * @typedef {"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"|"gray"|"grey"|"brightRed"|"brightGreen"|"brightYellow"|"brightBlue"|"brightMagenta"|"brightCyan"|"brightWhite"} ColorString
     */

    /**
     * @typedef {"reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough"} StyleString
     */

    /**
     * @param {ColorString} color 
     * @param {string} text 
     * @returns {string}
     */

    static $fgColor(text, color) {
        try {
            return colors[color](text)
        } catch (e) {
            throw new Error(`Couleur ${color} non définie !`)
        }
    }

    /**
     * @param {ColorString} color 
     * @param {string} text 
     * @returns {string}
     */

    static $bgColor(text, color) {
        try {
            color = "bg"+color[0].toUpperCase()+color.substring(1)
            return colors[color](text)
        } catch (e) {
            throw new Error(`Couleur de fond ${color} non définie !`)
        }
    }

    /**
     * @param {string} text 
     * @param {ColorString} foreground 
     * @param {ColorString} background 
     * @param {StyleString} style 
     * @returns {string}
     */

    static $color(text, foreground, background, style) {
        if (foreground) text = this.$fgColor(text, foreground);
        if (background) text = this.$bgColor(text, background);
        if (style) text = this.$fgColor(text, style);
        return text;
    }

    /**
     * @typedef DisplayColor
     * @property {ColorString} fg
     * @property {ColorString} bg
     * @property {StyleString} st 
     */

    /**
     * @typedef {Object} DisplayColors
     * @property {DisplayColor} icon
     * @property {DisplayColor} time
     * @property {DisplayColor} type
     * @property {DisplayColor} text
     */

    /**
     * @param {*} icon 
     * @param {*} logType 
     * @param {*} line 
     * @param {DisplayColors} displayColors
     */
    
    static logRawLine(icon, logType, time, line, displayColors) {
        line = 
            (this.hasIcons ? this.$color(icon.padEnd(3, " ").substring(0, 3), displayColors.icon.fg, displayColors.icon.bg) + " " : "") +
            this.$color(time, displayColors.time.fg, displayColors.time.bg) + " " + 
            this.$color(" " + logType[0] + " ", displayColors.type.fg, displayColors.type.bg) + " " +
            this.$color(line, displayColors.text.fg, displayColors.text.bg, displayColors.text.st)
        
        console.log(line)
    }

    /**
     * @param {string} icon 
     * @param {string} logType 
     * @param {string} text 
     * @param {DisplayColors} displayColors 
     */
    static logRaw(text, logType, time, icon, displayColors) {
        let lines = text.trim().split("\n")

        logType = logType || "?"
        if([null, "", " "].includes(icon) && lines.length > 1) icon = "┬";

        let prefix = null;
        for(let n in lines){
            if(n == 1) {
                time = " ".repeat(time.length);
                logType = " "
            }
            if (n == 0) {
                prefix = (lines.length > 1 ? "┠" : "┃") + icon;
            } else if (n < lines.length - 1) {
                prefix = "┇│";
            } else {
                prefix = "┇└";
            }

            this.logRawLine(prefix, logType, time, lines[n], displayColors)
        }
    }

    static verbose(...o) {
        this.logRaw(this.objectsToString(...o), "V", this.$getTimePrefix(), "", {
            icon : {fg: "gray", bg: null},
            time : {fg: "grey", bg: "black"},
            type : {fg: "grey", bg: null, st: "italic"},
            text : {fg: "grey", bg: null, st: "italic"}
        })
    };
    static debug(...o) {
        this.logRaw(this.objectsToString(...o), "D", this.$getTimePrefix(), "", {
            icon : {fg: "gray", bg: null},
            time : {fg: "grey", bg: "black"},
            type : {fg: "grey", bg: null},
            text : {fg: "grey", bg: null}
        })
    };
    static log(...o) {
        this.logRaw(this.objectsToString(...o), "L", this.$getTimePrefix(), "", {
            icon : {fg: "white", bg: null},
            time : {fg: "white", bg: "black"},
            type : {fg: "white", bg: "grey"},
            text : {fg: "grey", bg: null}
        })
    };
    static info(...o) {
        this.logRaw(this.objectsToString(...o), "I", this.$getTimePrefix(), "•", {
            icon : {fg: "blue", bg: null},
            time : {fg: "brightWhite", bg: "black"},
            type : {fg: "brightWhite", bg: "blue"},
            text : {fg: "brightWhite", bg: null}
        })
    };
    static success(...o) {
        this.logRaw(this.objectsToString(...o), "S", this.$getTimePrefix(), "•", {
            icon : {fg: "brightGreen", bg: null},
            time : {fg: "brightWhite", bg: "black"},
            type : {fg: "brightWhite", bg: "brightGreen"},
            text : {fg: "brightGreen", bg: null}
        })
    };
    static warn(...o) {
        this.logRaw(this.objectsToString(...o), "W", this.$getTimePrefix(), "⚠", {
            icon : {fg: "yellow", bg: null},
            time : {fg: "yellow", bg: "black"},
            type : {fg: "brightWhite", bg: "yellow"},
            text : {fg: "yellow", bg: null}
        })
    };
    static error(...o) {
        this.logRaw(this.objectsToString(...o), "E", this.$getTimePrefix(), "🞪", {
            icon : {fg: "brightRed", bg: null},
            time : {fg: "brightRed", bg: "black"},
            type : {fg: "brightWhite", bg: "brightRed"},
            text : {fg: "brightRed", bg: null}
        })
    };
    static fatal(...o) {
        this.logRaw(this.objectsToString(...o), "F", this.$getTimePrefix(), "🞪", {
            icon : {fg: "brightRed", bg: null},
            time : {fg: "brightRed", bg: "black"},
            type : {fg: "brightWhite", bg: "brightRed"},
            text : {fg: "brightWhite", bg: "brightRed"}
        })
    };
}