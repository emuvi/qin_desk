import { QinBody } from "qin_soul";
import { QinTalker } from "./qin-talker";

export class QinTalkerBas {
    private readonly _talker: QinTalker;

    public constructor(talker: QinTalker) {
        this._talker = talker;
    }

    public list(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._talker
                ._get("/list/base")
                .then((res) => resolve(QinBody.getTextLines(res.data)))
                .catch((err) => reject(err));
        });
    }
}
