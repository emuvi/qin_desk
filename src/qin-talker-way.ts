import { QinBody } from "qin_soul";
import { QinTalker } from "./qin-talker";

export class QinTalkerWay {
    private readonly _talker: QinTalker;

    public constructor(talker: QinTalker) {
        this._talker = talker;
    }

    public getSetup(): Promise<Setup> {
        return new Promise<Setup>((resolve, reject) => {
            this._talker
                ._get<Setup>("/way/setup")
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public setSetup(setup: Setup): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<string>("/way/setup", setup)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}

export type Setup = {
    serverName?: string;
    serverLang?: string;
    serverHost?: string;
    serverPort?: number;
    serverFolder?: string;
    servesPub?: boolean;
    servesApp?: boolean;
    servesDir?: boolean;
    servesCmd?: boolean;
    servesBas?: boolean;
    servesReg?: boolean;
    servesGiz?: boolean;

    configMap?: Map<string, string>;
    redirectMap?: Map<string, string>;

    threadsMin?: number;
    threadsMax?: number;
    threadsIdleTimeout?: number;
    cleanInterval?: number;
    tokenValidity?: number;
}