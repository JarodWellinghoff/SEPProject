import UsersCtrl from './users.controller.js';
import express from 'express';

const router = express.Router();

router.route('/').get(UsersCtrl.apiGetUsers);
router.route('/token/:token').get(UsersCtrl.apiGetUserByCurrentToken);
// router.route('/id/:id').get(UsersCtrl.apiGetUserByID);
router.route('/add').post(UsersCtrl.apiAddUser);
router.route('/update').put(UsersCtrl.apiUpdateUser);
// router.route('/delete').delete(UsersCtrl.apiDeleteUser);

export default router;