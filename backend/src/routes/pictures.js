import { Router } from "express";
import * as pictures from "../controllers/pictures.js";
import validation from "./validation.js";
// import controller for pictures here

const router = Router();

router.get("/", pictures.get);
router.get("/:id", pictures.getId);
router.use("/:id/validation", validation);

export default router;
