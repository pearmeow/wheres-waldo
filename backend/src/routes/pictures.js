import { Router } from "express";
import * as pictures from "../controllers/pictures.js";
// import controller for pictures here

const router = Router();

router.get("/", pictures.get);
router.get("/:id", pictures.getId);

export default router;
