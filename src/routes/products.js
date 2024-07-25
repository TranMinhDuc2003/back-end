import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controllers/product.js";
import { productSchema } from "../validSchema/productSchema.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const routerProduct = Router();

routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getOneProduct);

routerProduct.use("/", checkAuth,checkIsAdmin)
routerProduct.post("/" ,validBodyRequest(productSchema),createProduct);
routerProduct.delete("/:id", deleteProduct);
routerProduct.patch("/:id", validBodyRequest(productSchema), updateProduct);
export default routerProduct;
