import express from 'express';
import MoviesCtrl from './movies.controller.js';

const router = express.Router();

router.route('/').get(MoviesCtrl.apiGetMovies);
router.route('/id/:id').get(MoviesCtrl.apiGetMovieByID);
router.route('/genres').get(MoviesCtrl.apiGetMovieGenres);
router.route('/theater/:theater').get(MoviesCtrl.apiGetMovieByTheater);

export default router;