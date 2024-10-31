declare enum Level {
    VERBOSE = 10,
    DEBUG = 20,
    LOG = 30,
    INFO = 40,
    SUCCESS = 35,
    WARN = 50,
    ERROR = 60,
    FATAL = 70
}
type LevelValue = Level & number;
type LoggerConstructor = {
    level?: LevelValue;
    clear?: boolean;
};
declare class Logger {
    #private;
    static VERBOSE: Level;
    static DEBUG: Level;
    static LOG: Level;
    static INFO: Level;
    static SUCCESS: Level;
    static WARN: Level;
    static ERROR: Level;
    static FATAL: Level;
    verbose: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    success: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    fatal: (...args: any[]) => void;
    error: (...args: any[]) => void;
    constructor({ level, clear }?: LoggerConstructor);
    setLevel(value: Level): void;
    getLevel(): number;
    static clear(): void;
}
export default Logger;
