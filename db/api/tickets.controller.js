import TicketsDAO from "../dao/ticketsDAO.js";

export default class TicketsController {
    static makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static async apiAddTicket(req, res, next) {
        console.log(req.body);
        try {
            const ticket = {
                id: TicketsController.makeid(20),
                user_name: req.body.name,
                movie_title: req.body.movie_title,
                theater: req.body.theater,
                showtime: req.body.showtime,
                seat: req.body.seat,
            };
            const TicketResponse = await TicketsDAO.addTicket(ticket);
            res.json(TicketResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async apiGetTickets(req, res, next) {
        const ticketsPerPage = req.query.ticketsPerPage ? parseInt(req.query.ticketsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;
        let filters = {};
        if (req.query.user_id) {
            filters.user_id = req.query.user_id;
        } else if (req.query.movie_id) {
            filters.movie_id = req.query.movie_id;
        }
        const { ticketsList, totalNumTickets } = await TicketsDAO.getTickets({
            filters,
            page,
            ticketsPerPage,
        });
        let response = {
            tickets: ticketsList,
            page: page,
            filters: filters,
            entries_per_page: ticketsPerPage,
            total_results: totalNumTickets,
        };
        res.json(response);
    }
    static async apiGetTicketByID(req, res, next) {
        try {
            let id = req.params.id || {};
            let ticket = await TicketsDAO.getTicketByID(id);
            if (!ticket) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(ticket);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}