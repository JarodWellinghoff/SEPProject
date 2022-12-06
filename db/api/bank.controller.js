import BankDAO from "../dao/bankDAO.js";

export default class BankController {
    static async apiGetCards(req, res, next) {
        const cardsList = await BankDAO.getCards();
        res.json(cardsList);
    }

    static async apiGetCardByID(req, res, next) {
        try {
            let id = req.params.id || {};
            let card = await BankDAO.getCardByID(id);
            if (!card) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(card);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetCardByCardName(req, res, next) {
        try {
            let cardName = req.body.cardName || {};
            let card = await BankDAO.getCardByCardName(cardName);
            if (!card) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(card);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}