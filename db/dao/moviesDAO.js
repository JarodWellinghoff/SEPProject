// file manipulation and data manipulation for movies
import fs from 'fs';
import path from 'path';

export default class MoviesDAO {
    static async getMovies() {
        const moviesPath = path.join(process.cwd(), 'collections', 'movies.json');
        const fileContents = fs.readFileSync
            (moviesPath, 'utf8');
        return JSON.parse(fileContents);
    }

    static async getMovieByID(id) {
        const movies = await this.getMovies();
        return movies.find(movie => movie.id === id);
    }

    static async getMoviesByTitle(title) {
        const movies = await this.getMovies();
        return movies.filter(movie => movie.title === title);
    }

    static async addMovie(movie) {
        const movies = await this.getMovies();
        movies.push(movie);
        this.persistMovies(movies);
    }

    static async updateMovie(id, movie) {
        const movies = await this.getMovies();
        const movieIndex = movies.findIndex(movie => movie.id === id);
        movies[movieIndex] = movie;
        this.persistMovies(movies);
    }

    static async deleteMovie(id) {
        const movies = await this.getMovies();
        const movieIndex = movies.findIndex(movie => movie.id === id);
        movies.splice(movieIndex, 1);
        this.persistMovies(movies);
    }

    static async persistMovies(movies) {
        const moviesPath = path.join(process.cwd(), 'collections', 'movies.json');
        fs.writeFileSync(moviesPath, JSON.stringify(movies));
    }

}