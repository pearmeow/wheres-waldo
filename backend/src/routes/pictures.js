import { Router } from "express";
import * as pictures from "../controllers/pictures.js";
import * as characters from "../controllers/characters.js";
import validation from "./validation.js";
// import controller for pictures here

const router = Router();

router.get("/", pictures.get);
router.get("/:pictureId", pictures.getId);
router.use("/:pictureId/validation", validation);
router.get("/:pictureId/characters", characters.get);

export default router;
