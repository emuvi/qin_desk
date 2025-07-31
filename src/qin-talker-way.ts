import { QinBody, Setup } from "qin_soul";
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

