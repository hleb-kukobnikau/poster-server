import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";
import {Request, Response} from "express";
import {Session} from "express-session";

declare module 'express-session' {
    export interface SessionData {
        userId: number;
    }
}

export type EMContext = {
    em:  EntityManager<IDatabaseDriver<Connection>>,
    req: Request & { session: Session },
    res: Response,
}
