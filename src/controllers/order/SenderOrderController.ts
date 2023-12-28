import { Request, Response } from "express";
import { SenderOrderService } from "../../services/order/SenderOrderService";


class SenderOrderController {

    async handle(req: Request, res: Response){

        const { order_id }= req.body;

        const senderOrder = new SenderOrderService()

        const order = await senderOrder.execute({
            order_id
        });

        return res.json(order);

    }
}

export { SenderOrderController }