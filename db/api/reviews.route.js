import express from 'express';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router();

router.route('/').get(ReviewsCtrl.apiGetReviews)
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview);

export default router;