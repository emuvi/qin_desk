import { QinTalker } from "./qin-talker";

export class QinTalkerParam {
    private readonly _qinTalker: QinTalker;

    public constructor(qinTalker: QinTalker) {
        this._qinTalker = qinTalker;
    }

    public get(name: string, orDefault: string = ""): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._qinTalker
                .get("/param/" + encodeURIComponent(name))
                .then((res) => {
                    resolve(res.data ? res.data : orDefault);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
