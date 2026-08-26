import { Router } from "express";
import * as validation from "../controllers/validation.js";
// import controller for pictures here

const router = Router();

router.post("/:characterId", validation.post);

export default router;
