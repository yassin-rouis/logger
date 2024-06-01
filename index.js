const colors = require("colors/safe")

class Logger {
    static VERBOSE = 10;
    static DEBUG = 20;
    static LOG = 30;
    static INFO = 40;
    static SUCCESS = 35;
    static WARN = 50;
    static ERROR = 60;
    static FATAL = 70;

    static $objectsToString(...objects) {
        let text = []
        for(let obj of objects) {
            text.push(obj.toString())
        }

        return text.join(" ")
    }

    static $getTimePrefix() {
        return " " + (new Date()).toLocaleString() + " ";
    }

    static $fgColor(text, color) {
        try {
            return colors[color](text)
        } catch (e) {
            throw new Error(`Couleur ${color} non définie !`)
        }
    }

    static $bgColor(text, color) {
        try {
            color = "bg"+color[0].toUpperCase()+color.substring(1)
            return colors[color](text)
        } catch (e) {
            throw new Error(`Couleur de fond ${color} non définie !`)
        }
    }

    static $color(text, foreground, background, style) {
        if (foreground) text = this.$fgColor(text, foreground);
        if (background) text = this.$bgColor(text, background);
        if (style) text = this.$fgColor(text, style);
        return text;
    }

    constructor({level=Logger.LOG, icons=true, clear=true}={}) {
        this.$loggingLevel = level
        this.$hasIcons = icons
        if(clear) process.stdout.write('\x1Bc');
    }

    logRawLine(icon, logType, time, line, displayColors) {
        line = 
            (this.$hasIcons ? Logger.$color(icon.padEnd(3, " ").substring(0, 3), displayColors.icon.fg, displayColors.icon.bg) + " " : "") +
            Logger.$color(time, displayColors.time.fg, displayColors.time.bg) + " " + 
            Logger.$color(" " + logType[0] + " ", displayColors.type.fg, displayColors.type.bg) + " " +
            Logger.$color(line, displayColors.text.fg, displayColors.text.bg, displayColors.text.st)
        
        console.log(line)
    }

    logRaw(logLevel, text, logType, time, icon, displayColors) {
        if(logLevel < this.$loggingLevel) return
        
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

    static verboseDisplay = {
        icon : {fg: "gray", bg: null},
        time : {fg: "grey", bg: "black"},
        type : {fg: "grey", bg: null, st: "italic"},
        text : {fg: "grey", bg: null, st: "italic"}
    };
    verbose(...o) {
        this.logRaw(Logger.VERBOSE, Logger.$objectsToString(...o), "V", Logger.$getTimePrefix(), "", Logger.verboseDisplay)
    };
    static debugDisplay = {
        icon : {fg: "gray", bg: null},
        time : {fg: "grey", bg: "black"},
        type : {fg: "grey", bg: null},
        text : {fg: "grey", bg: null}
    };
    debug(...o) {
        this.logRaw(Logger.DEBUG, Logger.$objectsToString(...o), "D", Logger.$getTimePrefix(), "", Logger.debugDisplay)
    };
    static logDisplay = {
        icon : {fg: "white", bg: null},
        time : {fg: "white", bg: "black"},
        type : {fg: "white", bg: "grey"},
        text : {fg: "grey", bg: null}
    };
    log(...o) {
        this.logRaw(Logger.LOG, Logger.$objectsToString(...o), "L", Logger.$getTimePrefix(), "", Logger.logDisplay)
    };
    static infoDisplay = {
        icon : {fg: "blue", bg: null},
        time : {fg: "brightWhite", bg: "black"},
        type : {fg: "brightWhite", bg: "blue"},
        text : {fg: "brightWhite", bg: null}
    };
    info(...o) {
        this.logRaw(Logger.INFO, Logger.$objectsToString(...o), "I", Logger.$getTimePrefix(), "•", Logger.infoDisplay)
    };
    static successDisplay = {
        icon : {fg: "brightGreen", bg: null},
        time : {fg: "brightWhite", bg: "black"},
        type : {fg: "brightWhite", bg: "brightGreen"},
        text : {fg: "brightGreen", bg: null}
    };
    success(...o) {
        this.logRaw(Logger.SUCCESS, Logger.$objectsToString(...o), "S", Logger.$getTimePrefix(), "•", Logger.successDisplay)
    };
    static warnDisplay = {
        icon : {fg: "yellow", bg: null},
        time : {fg: "yellow", bg: "black"},
        type : {fg: "brightWhite", bg: "yellow"},
        text : {fg: "yellow", bg: null}
    };
    warn(...o) {
        this.logRaw(Logger.WARN, Logger.$objectsToString(...o), "W", Logger.$getTimePrefix(), "⚠", Logger.warnDisplay)
    };
    static errorDisplay = {
        icon : {fg: "brightRed", bg: null},
        time : {fg: "brightRed", bg: "black"},
        type : {fg: "brightWhite", bg: "brightRed"},
        text : {fg: "brightRed", bg: null}
    };
    error(...o) {
        this.logRaw(Logger.ERROR, Logger.$objectsToString(...o), "E", Logger.$getTimePrefix(), "🞪", Logger.errorDisplay)
    };
    static fatalDisplay = {
        icon : {fg: "brightRed", bg: null},
        time : {fg: "brightRed", bg: "black"},
        type : {fg: "brightWhite", bg: "brightRed"},
        text : {fg: "brightWhite", bg: "brightRed"}
    };
    fatal(...o) {
        this.logRaw(Logger.FATAL, Logger.$objectsToString(...o), "F", Logger.$getTimePrefix(), "🞪", Logger.fatalDisplay)
    };
}

module.exports = Logger