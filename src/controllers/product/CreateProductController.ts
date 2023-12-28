import { CreateProductService } from "../../services/Product/CreateProductService"
import { Request, Response, json } from "express";

class CreateProductController {

    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body;

        if(!req.file){
            throw new Error("Error, upload file")
        } else {
            const { originalname, filename: banner } = req.file;


            const createProduct = new CreateProductService();
            const product = await createProduct.execute({
                name,
                price,
                description,
                banner,
                category_id
            });
    
            return res.json(product);
        }
    }
}

export { CreateProductController }