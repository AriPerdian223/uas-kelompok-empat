// api.js

import express from "express";
import userController from "../controller/user-controller.js";
import undanganController from "../controller/undangan-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

/// user api
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

/// undangan api
userRouter.post("/api/undangans", undanganController.create);
userRouter.get("/api/undangans/:undanganId", undanganController.get);
userRouter.patch("/api/undangans/:undanganId", undanganController.update); // Ubah metode menjadi PATCH
userRouter.delete("/api/undangans/:undanganId", undanganController.remove);
userRouter.get("/api/undangans", undanganController.search);

export { userRouter };
