
import { Request, Response } from "express";
import { PadPaymentService } from "../../services/order/PadPayment";

class PadPaymentController {

    async handle(req: Request, res: Response){

        const { order_id } = req.params

        const padPayment = new PadPaymentService()
        const order = await padPayment.execute({ order_id });

        return res.json(order);

    }

}

export { PadPaymentController };