import { QinFrame } from "./qin-frame";
import { QinOurs } from "./qin-ours";
import { QinTalker } from "./qin-talker";
import { QinWindow } from "./qin-window";

export class Qinpel {
    private _chief: QinWindow;
    private _jobbed: QinFrame;

    public constructor(chief: QinWindow, jobbed: QinFrame) {
        this._chief = chief;
        this._jobbed = jobbed;
    }

    public get chief(): QinWindow {
        return this._chief;
    }

    public get jobbed(): QinFrame {
        return this._jobbed;
    }

    public get talk(): QinTalker {
        return this._chief.talk;
    }

    public get our() {
        return QinOurs;
    }

    public tr(of: string): string {
        return this.our.tr(of);
    }
}
