import TicketsCtrl from "./tickets.controller.js";
import express from 'express';

const router = express.Router();

router.route("/").get(TicketsCtrl.apiGetTickets);
router.route("/id/:id").get(TicketsCtrl.apiGetTicketByID);
router.route("/add").post(TicketsCtrl.apiAddTicket);

export default router;