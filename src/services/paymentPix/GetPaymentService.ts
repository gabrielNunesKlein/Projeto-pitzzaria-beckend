import axios from "axios"
import { readFile } from "fs/promises";
import * as https from 'https'

import prismaClient from "../../prisma";

interface GetPaymentRequest {
    token: string;
    txId: string;
    order_id: string;
}

class GetPaymentService {


    async execute({ token, txId, order_id}: GetPaymentRequest){

        var certificado = await readFile(`C:/Users/gabri/Documents/React JS/Project-6 Pitzzaria/backend/${process.env.CERTIFICATE}`);

        let data: any = {};
        await axios.get(`${process.env.GERENCIANET_URL}/v2/cob/${txId}`, {
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            httpsAgent: new https.Agent({
                pfx: certificado,
                passphrase: "",
            })
        }).then((response) => {
            data = response.data
        }).catch((err) => {
            data = err;
        })

        await prismaClient.order.update({
            where: {
                id: order_id
            },
            
            data: {
                status_payment: data?.status,
            }
        });

        return data;
        
        

    }
}

export { GetPaymentService };