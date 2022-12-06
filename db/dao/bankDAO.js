// import mongob from 'mongob';
// const ObjectId = mongob.ObjectId;
// let cards;
import fs from 'fs';
import path from 'path';

export default class BankDAO {
    static async getCards() {
        const cardsPath = path.join(process.cwd(), 'collections', 'bank.json');
        const fileContents = fs.readFileSync
            (cardsPath, 'utf8');
        return JSON.parse(fileContents);
    }
    static async addCard(card) {
        const cards = await this.getCards();
        cards.push(card);
        this.persistCards(cards);
        return card;
    }
    static async persistCards(cards) {
        const cardsPath = path.join(process.cwd(), 'collections', 'bank.json');
        fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2));
    }
    static async getCardByName(name) {
        const cards = await this.getCards();
        return cards.find(card => card.name === name);
    }
}
