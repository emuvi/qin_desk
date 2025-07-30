import { QinBody } from "qin_soul";
import { QinTalker } from "./qin-talker";

export class QinTalkerDir {
    private readonly _talker: QinTalker;

    public constructor(talker: QinTalker) {
        this._talker = talker;
    }

    public dirList(where: Where): Promise<PathKindList> {
        return new Promise<PathKindList>((resolve, reject) => {
            this._talker
                ._post<PathKindList>("/dir/list", where)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public dirNew(where: Where): Promise<Where> {
        return new Promise<Where>((resolve, reject) => {
            this._talker
                ._post<Where>("/dir/new", where)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public dirCopy(transfer: Transfer): Promise<Transfer> {
        return new Promise<Transfer>((resolve, reject) => {
            this._talker
                ._post<Transfer>("/dir/copy", transfer)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public dirMove(transfer: Transfer): Promise<Transfer> {
        return new Promise<Transfer>((resolve, reject) => {
            this._talker
                ._post<Transfer>("/dir/move", transfer)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public dirDel(where: Where): Promise<Where> {
        return new Promise<Where>((resolve, reject) => {
            this._talker
                ._post<Where>("/dir/del", where)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public fileRead(pathRead: PathRead): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<string>("/file/read", pathRead)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public fileWrite(pathWrite: PathWrite): Promise<Where> {
        return new Promise<Where>((resolve, reject) => {
            this._talker
                ._post<Where>("/file/write", pathWrite)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public fileAppend(pathWrite: PathWrite): Promise<Where> {
        return new Promise<Where>((resolve, reject) => {
            this._talker
                ._post<Where>("/file/append", pathWrite)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public fileCopy(transfer: Transfer): Promise<Transfer> {
        return new Promise<Transfer>((resolve, reject) => {
            this._talker
                ._post<Transfer>("/file/copy", transfer)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public fileMove(transfer: Transfer): Promise<Transfer> {
        return new Promise<Transfer>((resolve, reject) => {
            this._talker
                ._post<Transfer>("/file/move", transfer)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public fileDel(where: Where): Promise<Where> {
        return new Promise<Where>((resolve, reject) => {
            this._talker
                ._post<Where>("/file/del", where)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}

export enum PathKind {
    FOLDER = "FOLDER",
    FILE = "FILE"
}

export type PathKindName = {
    kind: PathKind;
    name: string;
}

export type PathKindList = Array<PathKindName>;

export type Where = {
    path: string;
}

export type Transfer = {
    origin: string;
    destiny: string;
}

export type PathRead = {
    path: string;
    base64: boolean;
    rangeStart: number;
    rangeLength: number;
}

export type PathWrite = {
    path: string;
    base64: boolean;
    data: string;
    rangeStart: number;
}
