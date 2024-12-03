import axios from "axios";
//import { readFile } from 'fs';
import { readFile } from "fs/promises";
import * as https from 'https'

import path from 'path';

//import '../../../gerencianet.pem'

class AuthPaymentService {

    async execute(){

        console.log("URL >>> ", process.env.GERENCIANET_URL)
        console.log("CLIENT_ID >>> ", process.env.CLIENT_ID)
        console.log("CLIENT_SECRET_ID >>> ", process.env.CLIENT_SECRET_ID)
        console.log("CERTIFICATE >>> ", process.env.CERTIFICATE)
        
         //var certificado = await readFile("C:/Users/gabri/Documents/React JS/Project-6 Pitzzaria/backend/homologacao-551158-TESTEAPI.p12");
         var certificado = await readFile(`C:/Users/gabri/Documents/React JS/Project-6 Pitzzaria/backend/${process.env.CERTIFICATE}`);
        var credenciais = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET_ID,
        };
          
        var data = JSON.stringify({ grant_type: "client_credentials" });
        var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;
          
        // Codificando as credenciais em base64
        var auth = Buffer.from(data_credentials).toString("base64");
        
        let dataRespponse: any
        //await axios.post("https://pix-h.api.efipay.com.br/oauth/token", data, {
            await axios.post(`${process.env.GERENCIANET_URL}/oauth/token`, data, {
            headers: {
                Authorization: 'Basic ' + auth,
                "Content-Type": "application/json"
            },
            httpsAgent: new https.Agent({
                pfx: certificado,
                passphrase: "",
            })
        }).then((response) => {
            console.log('RESPONSE >>> ', response)
            dataRespponse = response.data
        }).catch((err) => {
            console.log("ERR >>> ", err)
        })

        return dataRespponse;
    }
}

export { AuthPaymentService }