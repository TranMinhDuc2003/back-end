import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategoryById } from "../controllers/category.js";
import router from "./index.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { categorySchema } from "../validSchema/categorySchema.js";

const routerCategory = Router()

routerCategory.get("/",getAllCategory)
routerCategory.get("/:id",getCategoryById)

routerCategory.use("/",checkAuth,checkIsAdmin)
routerCategory.post("/",validBodyRequest(categorySchema), createCategory)
routerCategory.patch("/:id",validBodyRequest(categorySchema), updateCategoryById)
routerCategory.delete("/:id",deleteCategory)
export default routerCategory