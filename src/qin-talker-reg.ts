import { QinBody } from "qin_soul";
import { QinTalker } from "./qin-talker";

export class QinTalkerReg {
    private readonly _talker: QinTalker;

    public constructor(talker: QinTalker) {
        this._talker = talker;
    }

    public can(registry: Registry): Promise<AllowReg> {
        return new Promise<AllowReg>((resolve, reject) => {
            this._talker
                ._post<AllowReg>("/reg/can", registry)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public new(toInsert: ToInsert): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<string>("/reg/new", toInsert)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public ask(toSelect: ToSelect): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<string>("/reg/ask", toSelect)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public set(toUpdate: ToUpdate): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<string>("/reg/set", toUpdate)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    public del(toDelete: ToDelete): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._talker
                ._post<string>("/reg/del", toDelete)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}

export type AllowReg = {
    registry: Registry;
    all: Boolean;
    insert: Boolean;
    select: Boolean;
    update: Boolean;
    delete: Boolean;
    strain?: Strain;
}

export type Registry = {
   base: string;
   tableHead: TableHead;
}

export type Strain = {
   restrict?: string;
   modify?: string;
   include?: string;
}

export type ToInsert = {
   base: string;
   insert: Insert;
}

export type Insert = {
   tableHead: TableHead;
   valuedList: Array<Valued>;
   toGetID: ToGetID;
}

export type ToSelect = {
   base: string;
   select: Select;
}

export type Select = {
   tableHead: TableHead;
   fieldList: Array<Typed>;
   joinList: Array<Join>;
   filterList: Array<Filter>;
   orderList: Array<Order>;
   offset: number;
   limit: number;
}

export type ToUpdate = {
   base: string;
   update: Update;
}

export type Update = {
   tableHead: TableHead;
   valuedList: Array<Valued>;
   filterList: Array<Filter>;
   limit: number;
}

export type ToDelete = {
   base: string;
   delete: Delete;
}

export type Delete = {
   tableHead: TableHead;
   filterList: Array<Filter>;
}

export type TableHead = {
   catalog?: string;
   schema?: string;
   name: string;
   alias?: string;
}

export type ToGetID = {
   name: string;
   filter: Valued;
}

export type Order = {
   name: string;
   desc?: boolean;
}

export type Join = {
   tableHead: TableHead;
   alias?: String;
   filterList: Array<Filter>;
   joinTie?: JoinTie;
}

export enum JoinTie {
   INNER = "INNER",
   LEFT = "LEFT",
   RIGHT = "RIGHT",
   FULL = "FULL",
   CROSS = "CROSS"
}

export type Filter = {
   seems?: FilterSeems;
   likes?: FilterLikes;
   valued?: Valued;
   linked?: Linked;
   joinTie?: FilterTies;
}

export enum FilterSeems {
   SAME = "SAME",
   OTHER = "OTHER"
}

export enum FilterLikes {
   EQUALS = "EQUALS",
   BIGGER = "BIGGER",
   LESSER = "LESSER",
   BIGGER_EQUALS = "BIGGER_EQUALS",
   LESSER_EQUALS = "LESSER_EQUALS",
   STARTS_WITH = "STARTS_WITH",
   ENDS_WITH = "ENDS_WITH",
   CONTAINS = "CONTAINS"
}

export type Linked = {
   name: string;
   with: string;
}

export enum FilterTies {
   AND = "AND",
   OR = "OR"
}

export type Valued = {
   name: string;
   type?: Nature;
   data: any;
}

export type Typed = {
   name: string;
   type?: Nature;
   alias?: string;
}

export enum Nature {
   BIT = "BIT",
   BOOL = "BOOL",
   BYTE = "BYTE",
   TINY = "TINY",
   SMALL = "SMALL",
   INT = "INT",
   LONG = "LONG",
   SERIAL = "SERIAL",
   BIG_SERIAL = "BIG_SERIAL",
   FLOAT = "FLOAT",
   REAL = "REAL",
   DOUBLE = "DOUBLE",
   NUMERIC = "NUMERIC",
   BIG_NUMERIC = "BIG_NUMERIC",
   CHAR = "CHAR",
   CHARS = "CHARS",
   DATE = "DATE",
   TIME = "TIME",
   DATE_TIME = "DATE_TIME",
   TIMESTAMP = "TIMESTAMP",
   BYTES = "BYTES",
   BLOB = "BLOB",
   TEXT = "TEXT"
}