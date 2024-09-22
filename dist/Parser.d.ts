declare class Parser {
    private static $coloredNull;
    private static $coloredUndefined;
    private static $tabulation;
    static parseAny(obj: any, colored?: boolean, depth?: number, tabulation?: number): any;
    private static parseNullOrUndefined;
    static parseFunction(val?: Function, colored?: boolean): string;
    static parseUnknown(val?: any, colored?: boolean): any;
    static parseString(val?: string, colored?: boolean): string;
    static parseNumber(val?: number, colored?: boolean): string;
    static parseBigInt(val?: number, colored?: boolean): string;
    static parseBoolean(val?: boolean, colored?: boolean): string;
    static parseObject(val?: any, colored?: boolean, depth?: number, tabulation?: number): string;
    private static parseArray;
}
export default Parser;
