const colors = require("colors/safe")

const colorNames = [
    "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray", "grey",
    "brightRed", "brightGreen", "brightYellow", "brightBlue", "brightMagenta", "brightCyan", "brightWhite",
    "bgBlack", "bgRed", "bgGreen", "bgYellow", "bgBlue", "bgMagenta", "bgCyan", "bgWhite", "bgGray", "bgGrey",
    "bgBrightRed", "bgBrightGreen", "bgBrightYellow", "bgBrightBlue", "bgBrightMagenta", "bgBrightCyan", "bgBrightWhite"
]

class Logger {
    hasIcons = true;
    colored = true;

    static init({ withIcons = true, clearChat = true, colored = true}) {
        if(clearChat) process.stdout.write('\x1Bc');
        this.hasIcons = withIcons;
        this.colored = colored;
        if(!colored) colors.disable();
    }

    static getTimePrefix(date) {
        // [-@] [30/05/2024 - 20:33:54.326] [ S ] Log..............
        let d = date.getDate().toString().padStart(2, '0');
        let m = (date.getMonth() + 1).toString().padStart(2, '0');
        let y = date.getFullYear();
        let H = date.getHours().toString().padStart(2, '0');
        let M = date.getMinutes().toString().padStart(2, '0');
        let S = date.getSeconds().toString().padStart(2, '0');
        let MS = date.getMilliseconds().toString().padStart(3, '0');
        return `[${d}/${m}/${y} - ${H}:${M}:${S}.${MS}]`;
    }

    /**
     * 
     * @param {string} text 
     * @param {"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"|"gray"|"grey"|"brightRed"|"brightGreen"|"brightYellow"|"brightBlue"|"brightMagenta"|"brightCyan"|"brightWhite"|"bgBlack"|"bgRed"|"bgGreen"|"bgYellow"|"bgBlue"|"bgMagenta"|"bgCyan"|"bgWhite"|"bgGray"|"bgGrey"|"bgBrightRed"|"bgBrightGreen"|"bgBrightYellow"|"bgBrightBlue"|"bgBrightMagenta"|"bgBrightCyan"|"bgBrightWhite"} color 
     */
    
    static color(text, color) {
        if(!(color in colorNames)) {
            throw new Error("Invalid color name");
        }
        return colors[color](text)
    }
}