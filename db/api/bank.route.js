import express from 'express';
import BankCtrl from './bank.controller.js';

const router = express.Router();

router.route('/').get(BankCtrl.apiGetCards);

export default router;