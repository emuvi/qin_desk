import axios from "axios";
import { QinTalkerApp } from "./qin-talker-app";
import { QinTalkerBas } from "./qin-talker-bas";
import { QinTalkerCmd } from "./qin-talker-cmd";
import { QinTalkerGiz } from "./qin-talker-giz";
import { QinTalkerUtils } from "./qin-talker-utils";
import { QinWindow } from "./qin-window";

export class QinTalker {
    private readonly _qinWindow: QinWindow;
    private readonly _qinTalkerApp: QinTalkerApp;
    private readonly _qinTalkerBas: QinTalkerBas;
    private readonly _qinTalkerCmd: QinTalkerCmd;
    private readonly _qinTalkerGiz: QinTalkerGiz;
    private readonly _qinTalkerUtils: QinTalkerUtils;

    public constructor(qinWindow: QinWindow) {
        this._qinWindow = qinWindow;
        this._qinTalkerApp = new QinTalkerApp(this);
        this._qinTalkerBas = new QinTalkerBas(this);
        this._qinTalkerCmd = new QinTalkerCmd(this);
        this._qinTalkerGiz = new QinTalkerGiz(this);
        this._qinTalkerUtils = new QinTalkerUtils(this);
    }

    public get app() {
        return this._qinTalkerApp;
    }

    public get bas() {
        return this._qinTalkerBas;
    }

    public get cmd() {
        return this._qinTalkerCmd;
    }

    public get giz() {
        return this._qinTalkerGiz;
    }

    public get utils() {
        return this._qinTalkerUtils;
    }

    public _get<T = any>(address: string, headers?: any): Promise<T> {
        let configs = this._qinWindow.getAxiosConfig(headers);
        return new Promise<T>((resolve, reject) => {
            axios.get<T>(address, configs)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });
    }

    public _post<T = any>(address: string, data: any, headers?: any): Promise<T> {
        let configs = this._qinWindow.getAxiosConfig(headers);
        if (!configs.headers["Content-Type"]) {
            if (typeof data === "string" || data instanceof String) {
                configs.headers["Content-Type"] = "text/plain";
            } else if (data instanceof FormData) {
                configs.headers["Content-Type"] = "multipart/form-data";
            } else {
                configs.headers["Content-Type"] = "application/json";
            }
        }
        return new Promise<T>((resolve, reject) => {
            axios.post<T>(address, data, configs)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });
    }
}
