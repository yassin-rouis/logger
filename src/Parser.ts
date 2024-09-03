import colors from "colors";

class Parser {
    private static $coloredNull = colors.yellow(colors.bold("null"));
    private static $coloredUndefined = colors.grey(colors.bold("undefined"));
    private static $tabulation = "  ";

    public static parseAny(obj: any, colored: boolean = true, depth: number = 5, tabulation: number = 0) {
        switch(typeof obj) {
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
            default : {
                return Parser.parseUnknown(obj, colored);
            }
        }
    }

    private static parseNullOrUndefined(val: null | undefined, colored: boolean = true) {
        if (colored) {
            if (val === null) {
                return this.$coloredNull;
            } else {
                return this.$coloredUndefined;
            }
        } else {
            if (val === null) {
                return "null";
            } else {
                return "undefined";
            }
        }
    }

    // ================ Types ================

    public static parseFunction(val?: Function, colored: boolean = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if (colored) {
            return colors.cyan(`[Function (${val.name === "" ? "anonymous" : val.name})]`);
        } else {
            return `[Function (${val.name === "" ? "anonymous" : val.name})]`;
        }
    }

    public static parseUnknown(val?: any, colored: boolean = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if (colored) {
            return colors.red(colors.italic(val.toString()));
        } else {
            return val.toString();
        }
    }

    public static parseString(val?: string, colored: boolean = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if (colored) {
            return colors.green(`"${val}"`);
        } else {
            return `"${val}"`;
        }
    }

    public static parseNumber(val?: number, colored: boolean = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if (colored) {
            return colors.yellow((val).toString());
        } else {
            return (val).toString();
        }
    }

    public static parseBigInt(val?: number, colored: boolean = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if (colored) {
            return colors.yellow((val).toString()+"n");
        } else {
            return (val).toString()+"n";
        }
    }

    public static parseBoolean(val?: boolean, colored: boolean = true) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if (colored) {
            if (val) {
                return colors.bold(colors.green("true"));
            } else  {
                return colors.bold(colors.red("false"));
            }
        } else {
            return (val ? "true" : "false")
        }
    }

    public static parseObject(val?: any, colored: boolean = true, depth: number = 5, tabulation: number = 0) {
        if (val === undefined || val === null) {
            return this.parseNullOrUndefined(val, colored);
        }

        if(Array.isArray(val)) {
            return this.parseArray(val, colored, depth, tabulation);
        }
        let parts = []

        if (depth <= 0) return (colored ? colors.cyan("[object Object]") : "[object Object]");

        for(let i in val) {
            parts.push([Parser.parseAny(i, colored), Parser.parseAny(val[i], colored, depth-1, tabulation+1)]);
        }

        if (parts.length <= 3) {
            let result = colors.white("{ ")

            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                if (i != 0) result += colors.white(", ")
                result += part[0] + colors.white(": ") + part[1]
            }

            result += colors.white(" }")
            return result
        } else {
            let result = colors.white("{")

            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                if (i != 0) result += colors.white(",")
                result += "\n" + this.$tabulation.repeat(tabulation+1) + part[0] + colors.white(": ") + part[1];
            }

            result += "\n" + colors.white("}")
            return result
        }
    }

    private static parseArray(val: any[], colored: boolean = true, depth: number = 5, tabulation: number = 0): string {
        if (depth <= 0) {
            return (colored ? colors.cyan("[object Object]") : "[object Object]");
        } else {
            let parts = []

            for(let obj of val) {
                parts.push(Parser.parseAny(obj, colored, depth-1, tabulation+1));
            }


            if (parts.length <= 5) {
                return colors.white("[ ") + parts.join(colors.white(", ")) + colors.white(" ]")
            } else {
                let result = colors.white("[")
                for(let i = 0; i < parts.length; i++) {
                    if (i % 3 == 0) {
                        result += (i==0?"\n":colors.white(",")+"\n") + this.$tabulation.repeat(tabulation+1) + parts[i]
                    } else {
                        result += colors.white(", ") + parts[i]
                    }
                }
                result += "\n" + this.$tabulation.repeat(tabulation) + colors.white("]")
                return result
            }
        }
    }
}

module.exports = Parser
export default Parser;