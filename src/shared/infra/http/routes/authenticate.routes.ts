import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticatesRoutes.post("/sessions", authenticateUserController.handle);
authenticatesRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticatesRoutes };
