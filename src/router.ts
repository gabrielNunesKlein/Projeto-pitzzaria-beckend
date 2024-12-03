import { Router } from "express";
import multer from 'multer';
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

import uploadConfig from './config/multer';
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SenderOrderController } from "./controllers/order/SenderOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { AuthPaymentController } from "./controllers/paymentPIX/AuthPaymentController";
import { GeneratedPaymentController } from "./controllers/paymentPIX/GeneratedPaymentController";
import { GetPaymentController } from "./controllers/paymentPIX/GetPaymentController";
import { PadPaymentController } from "./controllers/order/PadPaymentController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/detail', isAuthenticated, new DetailUserController().handle);

// Rotas Categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// Rotas Products
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

// rotas order
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/removeItem', isAuthenticated, new RemoveItemController().handle);

router.put('/order/send', isAuthenticated, new SenderOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrderController().handle);

router.get('/oder/detail', isAuthenticated, new DetailOrderController().handle);

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

router.put('/order/PadPayment/:order_id', isAuthenticated, new PadPaymentController().handle);

// payment route
router.post('/paymentPix', new AuthPaymentController().handle);

router.put('/generatedPayment', new GeneratedPaymentController().handle);

router.get('/getPayment/:token/:txId/:order_id', new GetPaymentController().handle);

export { router }