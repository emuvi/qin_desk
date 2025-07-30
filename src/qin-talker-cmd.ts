import { QinBody } from "qin_soul";
import { QinExecute } from "./qin-execute";
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

    public run(execution: QinExecute): Promise<IssuedToken> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<IssuedToken>("/cmd/run", execution)
                .then((token) => resolve(token))
                .catch((err) => reject(err));
        });
    }
}
