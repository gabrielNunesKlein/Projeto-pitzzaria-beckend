import axios from "axios"
import { readFile } from "fs/promises";
import * as https from 'https'

import prismaClient from "../../prisma";

interface GeneratedPaymentRequest {
    token: string;
    txId: string;
    nome: string;
    cpf: string;
    order_id: string;
}

class GeneratedPaymentService {

    async execute({ token, txId, nome, cpf, order_id }: GeneratedPaymentRequest){

       // var certificado = await readFile("C:/Users/gabri/Documents/React JS/Project-6 Pitzzaria/backend/homologacao-551158-TESTEAPI.p12");
       var certificado = await readFile(`C:/Users/gabri/Documents/React JS/Project-6 Pitzzaria/backend/${process.env.CERTIFICATE}`);
        var request =  {
            "calendario": {
              "expiracao": 3600
            },
            "devedor": {
              "cpf": cpf,
              "nome": nome
            },
            "valor": {
              "original": "00.01"
            },
            "chave": "e0fbe63e-74b2-4bce-b1ef-be7567be7d15",
            "solicitacaoPagador": "Cobrança dos serviços prestados."
        }

        let data: any = {};
        //await axios.put(`https://pix-h.api.efipay.com.br/v2/cob/${txId}`, request,
        await axios.put(`${process.env.GERENCIANET_URL}/v2/cob/${txId}`, request,
        {
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
                txId: txId
            }
        });


        return data

    }
}

export { GeneratedPaymentService }