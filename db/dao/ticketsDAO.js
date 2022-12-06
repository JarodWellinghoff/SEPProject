// import mongodb from 'mongodb';
// const ObjectId = mongodb.ObjectId;
// let tickets;
import fs from 'fs';
import path from 'path';

export default class TicketsDAO {
    static async getTickets() {
        const ticketsPath = path.join(process.cwd(), 'collections', 'tickets.json');
        const fileContents = fs.readFileSync
            (ticketsPath, 'utf8');
        return JSON.parse(fileContents);
    }
    static async addTicket(ticket) {
        const tickets = await this.getTickets();
        tickets.push(ticket);
        this.persistTickets(tickets);
        return ticket;
    }
    static async persistTickets(tickets) {
        const ticketsPath = path.join(process.cwd(), 'collections', 'tickets.json');
        fs.writeFileSync(ticketsPath, JSON.stringify(tickets, null, 2));
    }
    static async getTicketByID(id) {
        const tickets = await this.getTickets();
        return tickets.find(ticket => ticket.id === id);
    }
}