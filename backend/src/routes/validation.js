import { Router } from "express";
import * as validation from "../controllers/validation.js";
// import controller for pictures here

const router = Router();

router.post("/:id", validation.post);

export default router;
