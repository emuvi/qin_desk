import { QinTalker } from "./qin-talker";
import { QinTalkerUtilsIssued } from "./qin-talker-utils-issued";

export class QinTalkerUtils {
    private readonly _qinTalker: QinTalker;
    private readonly _qinTalkerUtilsIssued: QinTalkerUtilsIssued;

    public constructor(qinTalker: QinTalker) {
        this._qinTalker = qinTalker;
        this._qinTalkerUtilsIssued = new QinTalkerUtilsIssued(this);
    }

    public ping(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._qinTalker
                ._get<string>("/ping")
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public getLang(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._qinTalker
                ._get<string>("/lang")
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public tryEnter(tryAuth: TryAuth): Promise<Logged> {
        return new Promise<Logged>((resolve, reject) => {
            this._qinTalker
                ._post<Logged>("/enter", tryAuth)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public isLogged(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._qinTalker
                ._get<string>("/logged")
                .then((res) => resolve(res !== "<--NO_USER_LOGGED-->"))
                .catch((err) => reject(err));
        });
    }

    public getLogged(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._qinTalker
                ._get<string>("/logged")
                .then((res) => {
                    if (res !== "<--NO_USER_LOGGED-->") {
                        resolve(res);
                    } else {
                        reject(new Error("No user is logged."));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public getConfig(name: string, orDefault: string = ""): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._qinTalker
                ._get<string>("/config/" + encodeURIComponent(name))
                .then((config) => resolve(config ? config : orDefault))
                .catch((err) => reject(err));
        });
    }

    public askIssued(question: IssuedQuestion): Promise<IssuedAnswer> {
        return new Promise<IssuedAnswer>((resolve, reject) => {
            this._qinTalker
                ._post<IssuedAnswer>("/issued", question)
                .then((answer) => resolve(answer))
                .catch((err) => reject(err));
        });
    }

    public get issued(): QinTalkerUtilsIssued {
        return this._qinTalkerUtilsIssued;
    }
}

export type TryAuth = {
    name: string;
    pass: string;
};

export type Logged = {
    token: string;
    lang: string;
};

export type IssuedToken = string;

export type IssuedQuestion = {
    token: IssuedToken;
    askCreatedAt?: boolean;
    askOutLines?: boolean;
    askOutLinesFrom?: number;
    askOutLinesUntil?: number;
    askOutLinesSize?: boolean;
    askErrLines?: boolean;
    askErrLinesFrom?: number;
    askErrLinesUntil?: number;
    askErrLinesSize?: boolean;
    askResultCode?: boolean;
    askIsDone?: boolean;
    askHasOut?: boolean;
    askHasErr?: boolean;
    askFinishedAt?: boolean;
};

export type IssuedAnswer = {
    createdAt?: number;
    outLines?: string;
    outLinesFrom?: string[];
    outLinesSize?: number;
    errLines?: string;
    errLinesFrom?: string[];
    errLinesSize?: number;
    resultCode?: number;
    isDone?: boolean;
    hasOut?: boolean;
    hasErr?: boolean;
    finishedAt?: number;
};
