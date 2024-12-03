import { GeneratedPaymentService } from "../../services/paymentPix/GeneratedPaymentService"
import { Request, Response, json } from "express";


class GeneratedPaymentController {

    async handle(req: Request, res: Response){

        const { token, txId, nome, cpf, order_id } = req.body

        const generatedPayment = new GeneratedPaymentService();
        let data = await generatedPayment.execute({ token: token, txId: txId, nome: nome, cpf: 
            cpf, order_id: order_id});

        return res.json(data)

    }
}

export { GeneratedPaymentController };