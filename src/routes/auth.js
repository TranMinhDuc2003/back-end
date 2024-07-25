import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { authSchema } from "../validSchema/authSchema.js";
import { showProfile } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routerAuth = Router();
routerAuth.post('/register',validBodyRequest(authSchema) ,register)
routerAuth.post('/login' ,login)

routerAuth.use('/',checkAuth)
routerAuth.get('/me', showProfile)
export default routerAuth;
