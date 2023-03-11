import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticatesRoutes.post("/sessions", authenticateUserController.handle);

export { authenticatesRoutes };
