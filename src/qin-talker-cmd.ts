import { QinBody } from "qin_soul";
import { QinTalker } from "./qin-talker";
import { IssuedToken } from "./qin-talker-utils";

export class QinTalkerCmd {
    private readonly _talker: QinTalker;

    public constructor(talker: QinTalker) {
        this._talker = talker;
    }

    public list(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._talker
                ._get<string>("/list/cmd")
                .then((text) => resolve(QinBody.getTextLines(text)))
                .catch((err) => reject(err));
        });
    }

    public run(execute: Execute): Promise<IssuedToken> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<IssuedToken>("/cmd/run", execute)
                .then((token) => resolve(token))
                .catch((err) => reject(err));
        });
    }
}

export type Execute = {
    name: string;
    args?: string[];
    input?: string[];
    joinErrs?: boolean;
    logLevel?: LogLevel;
};

export enum LogLevel {
    LEVEL_ERROR = 0,
    LEVEL_WARN = 1,
    LEVEL_INFO = 2,
    LEVEL_DEBUG = 3,
    LEVEL_TRACE = 4,
}
