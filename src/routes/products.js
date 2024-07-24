import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controllers/product";
import { productSchema } from "../validSchema/productSchema";
import { validBodyRequest } from "../middlewares/validBodyRequest";
import { checkAuth } from "../middlewares/checkAuth";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";

const routerProduct = Router();

routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getOneProduct);

routerProduct.use("/", checkAuth,checkIsAdmin)
routerProduct.post("/" ,validBodyRequest(productSchema),createProduct);
routerProduct.delete("/:id", deleteProduct);
routerProduct.patch("/:id", validBodyRequest(productSchema), updateProduct);
export default routerProduct;
