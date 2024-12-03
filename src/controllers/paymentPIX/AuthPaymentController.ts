import { AuthPaymentService } from "../../services/paymentPix/AuthPaymentService";
import { Request, Response, json } from "express";

class AuthPaymentController {

    async handle(req: Request, res: Response){

        const authPayment = new AuthPaymentService()
        let auth = await authPayment.execute()

        return res.json(auth);

    }

}

export { AuthPaymentController }