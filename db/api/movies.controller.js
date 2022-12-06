import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        const moviesList = await MoviesDAO.getMovies();
        res.json(moviesList);
    }

    static async apiGetMovieByID(req, res, next) {
        try {
            let id = req.params.id || {};
            let movie = await MoviesDAO.getMovieByID(id);
            if (!movie) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(movie);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetMovieGenres(req, res, next) {
        try {
            let genres = await MoviesDAO.getGenres();
            res.json(genres);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetMovieByTheater(req, res, next) {
        try {
            let theater = req.params.theater || {};
            let movies = await MoviesDAO.getMovieByTheater(theater);
            res.json(movies);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
