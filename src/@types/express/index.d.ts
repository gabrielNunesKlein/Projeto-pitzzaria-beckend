declare namespace Express {
    export interface Request {
        user_id: string;
        token: string;
        order_id: string;
        txId: string;
    }
}