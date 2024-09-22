"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Parser {
    static $coloredNull = colors_1.default.yellow(colors_1.default.bold("null"));
    static $coloredUndefined = colors_1.default.grey(colors_1.default.bold("undefined"));
    static $tabulation = "  ";
    static parseAny(obj, colored = true, depth = 5, tabulation = 0) {
        switch (typeof obj) {
            case "string": {
                return Parser.parseString(obj, colored);
            }
            case "number": {
                return Parser.parseNumber(obj, colored);
            }
            case "function": {
                return Parser.parseFunction(obj, colored);
            }
            case "boolean": {
                return Parser.parseBoolean(obj, colored);
            }
            case "object": {
                return Parser.parseObject(obj, colored, depth, tabulation);
            }
            case "undefined": {
                return Parser.parseNullOrUndefined(obj, colored);
            }
            default: {
                return Parser.parseUnknown(obj, colored);
            }
        }
    }
    static parseNullOrUndefined(val, colored = true) {
        if (colored) {
            if (val === null) {
                return this.$coloredNull;
            }
            else {
                return this.$coloredUndefined;
            }
        }
        else {
            if (val === null) {
                return "null";
            }
            else {
                return "undefined";
            }
        }
    }
    // ================ Types ================
    static parseFunction(val, colored = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (colored) {
            return colors_1.default.cyan(`[Function (${val.name === "" ? "anonymous" : val.name})]`);
        }
        else {
            return `[Function (${val.name === "" ? "anonymous" : val.name})]`;
        }
    }
    static parseUnknown(val, colored = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (colored) {
            return colors_1.default.red(colors_1.default.italic(val.toString()));
        }
        else {
            return val.toString();
        }
    }
    static parseString(val, colored = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (colored) {
            return colors_1.default.green(`"${val}"`);
        }
        else {
            return `"${val}"`;
        }
    }
    static parseNumber(val, colored = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (colored) {
            return colors_1.default.yellow((val).toString());
        }
        else {
            return (val).toString();
        }
    }
    static parseBigInt(val, colored = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (colored) {
            return colors_1.default.yellow((val).toString() + "n");
        }
        else {
            return (val).toString() + "n";
        }
    }
    static parseBoolean(val, colored = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (colored) {
            if (val) {
                return colors_1.default.bold(colors_1.default.green("true"));
            }
            else {
                return colors_1.default.bold(colors_1.default.red("false"));
            }
        }
        else {
            return (val ? "true" : "false");
        }
    }
    static parseObject(val, colored = true, depth = 5, tabulation = 0) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }
        if (Array.isArray(val)) {
            return this.parseArray(val, colored, depth, tabulation);
        }
        let parts = [];
        if (depth <= 0)
            return (colored ? colors_1.default.cyan("[object Object]") : "[object Object]");
        for (let i in val) {
            parts.push([Parser.parseAny(i, colored), Parser.parseAny(val[i], colored, depth - 1, tabulation + 1)]);
        }
        if (parts.length <= 3) {
            let result = colors_1.default.white("{ ");
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                if (i !== 0)
                    result += colors_1.default.white(", ");
                result += part[0] + colors_1.default.white(": ") + part[1];
            }
            result += colors_1.default.white(" }");
            return result;
        }
        else {
            let result = colors_1.default.white("{");
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                if (i !== 0)
                    result += colors_1.default.white(",");
                result += "\n" + this.$tabulation.repeat(tabulation + 1) + part[0] + colors_1.default.white(": ") + part[1];
            }
            result += "\n" + colors_1.default.white("}");
            return result;
        }
    }
    static parseArray(val, colored = true, depth = 5, tabulation = 0) {
        if (depth <= 0) {
            return (colored ? colors_1.default.cyan("[object Object]") : "[object Object]");
        }
        else {
            let parts = [];
            for (let obj of val) {
                parts.push(Parser.parseAny(obj, colored, depth - 1, tabulation + 1));
            }
            if (parts.length <= 5) {
                return colors_1.default.white("[ ") + parts.join(colors_1.default.white(", ")) + colors_1.default.white(" ]");
            }
            else {
                let result = colors_1.default.white("[");
                for (let i = 0; i < parts.length; i++) {
                    if (i % 3 === 0) {
                        result += (i === 0 ? "\n" : colors_1.default.white(",") + "\n") + this.$tabulation.repeat(tabulation + 1) + parts[i];
                    }
                    else {
                        result += colors_1.default.white(", ") + parts[i];
                    }
                }
                result += "\n" + this.$tabulation.repeat(tabulation) + colors_1.default.white("]");
                return result;
            }
        }
    }
}
module.exports = Parser;
exports.default = Parser;
