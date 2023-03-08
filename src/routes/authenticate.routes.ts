import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticatesRoutes.post("/sessions", authenticateUserController.handle);

export { authenticatesRoutes };
