import { Request, Response, json } from "express";
import { GetPaymentService } from "../../services/paymentPix/GetPaymentService";


class GetPaymentController {

    async handle(req: Request, res: Response){

        const { token, txId, order_id } = req.params;


        const getPaymentService = new GetPaymentService();
        const data = await getPaymentService.execute({
            token,
            txId,
            order_id
        })

        return res.json(data);

    }

}

export { GetPaymentController };