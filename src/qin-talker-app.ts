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
                ._get<string>("/list/app")
                .then((text) => resolve(QinBody.getTextLines(text)))
                .catch((err) => reject(err));
        });
    }

    public manifest(name: string): Promise<QinManifest> {
        return new Promise<QinManifest>((resolve, reject) => {
            this._talker
                ._get<QinManifest>("/app/" + name + "/manifest.json")
                .then((manifest) => resolve(manifest))
                .catch((err) => reject(err));
        });
    }

    public get<T = any>(name: string, address: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._talker
                ._get<T>("/app/" + name + "/" + address)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}
