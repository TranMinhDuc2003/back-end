import { Router } from "express";
import { login, register } from "../controllers/auth";
import { validBodyRequest } from "../middlewares/validBodyRequest";
import { authSchema } from "../validSchema/authSchema";
import { showProfile } from "../controllers/user";
import { checkAuth } from "../middlewares/checkAuth";

const routerAuth = Router();
routerAuth.post('/register',validBodyRequest(authSchema) ,register)
routerAuth.post('/login' ,login)

routerAuth.use('/',checkAuth)
routerAuth.get('/me', showProfile)
export default routerAuth;
