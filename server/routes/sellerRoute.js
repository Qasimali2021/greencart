import express from "express";
import {
  sellerIsAuth,
  sellerLogin,
  sellerLogout,
} from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, sellerIsAuth);
sellerRouter.get("/logout", sellerLogout);

export default sellerRouter;
