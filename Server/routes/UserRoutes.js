import express from "express";
import {
  addtoCart,
  addtoFavourites,
  getCarts,
  getFavourites,
  delFromCart,
  delFromFavourites,
} from "../controllers/UserController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/addtoCart", addtoCart);
router.post("/addtoFavourites", addtoFavourites);
router.get("/getCarts", checkAuth, getCarts);
router.get("/getFavourites", checkAuth, getFavourites);
router.delete("/carts/:productId", checkAuth, delFromCart);
router.delete("/favourites/:productId", checkAuth, delFromFavourites);
export default router;
