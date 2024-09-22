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
    constructor({ level, clear }?: LoggerConstructor);
    setLevel(value: Level): void;
    getLevel(): number;
    static clear(): void;
}
export default Logger;
