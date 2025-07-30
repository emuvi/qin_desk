import { QinBody } from "qin_soul";
import { QinExecute } from "./qin-execute";
import { QinTalker } from "./qin-talker";
import { QinManifest } from "./qin-desk";

export class QinTalkerApp {
    private readonly _talker: QinTalker;

    public constructor(talker: QinTalker) {
        this._talker = talker;
    }

    public list(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._talker
                ._get("/list/app")
                .then((res) => resolve(QinBody.getTextLines(res.data)))
                .catch((err) => reject(err));
        });
    }

    public manifest(name: string): Promise<QinManifest> {
        return new Promise<QinManifest>((resolve, reject) => {
            this._talker
                ._get("/app/" + name + "/manifest.json")
                .then((res) => resolve(res.data as QinManifest))
                .catch((err) => reject(err));
        });
    }
}
