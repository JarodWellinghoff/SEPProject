import TheatersDAO from "../dao/theatersDAO.js";

export default class TheatersController {
    static async apiGetTheaters(req, res, next) {

        const theatersList = await TheatersDAO.getTheaters();
        res.json(theatersList);
    }

    static async apiGetTheaterByID(req, res, next) {
        try {
            let id = req.params.id || {};
            let theater = await TheatersDAO.getTheaterByID(id);
            if (!theater) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(theater);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}