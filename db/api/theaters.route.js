import TheatersCtlr from "./theaters.controller.js";
import express from 'express';

const router = express.Router();

router.route("/").get(TheatersCtlr.apiGetTheaters);
router.route("/id/:id").get(TheatersCtlr.apiGetTheaterByID);

export default router;