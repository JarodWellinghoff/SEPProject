// import mongodb from 'mongodb';
// import userSchema from '../models/user.model.js';
// const ObjectId = mongodb.ObjectId;
// let users;
import fs from 'fs';
import path from 'path';

export default class UsersDAO {
    static async getUsers() {
        const usersPath = path.join(process.cwd(), 'collections', 'users.json');
        const fileContents = fs.readFileSync
            (usersPath, 'utf8');
        return JSON.parse(fileContents);
    }
    static async addUser(user) {
        const users = await this.getUsers();
        users.push(user);
        this.persistUsers(users);
    }
    static async getUserByEmail(email) {
        const users = await this.getUsers();
        return users.filter(user => user.email === email);
    }
    static async persistUsers(users) {
        const usersPath = path.join(process.cwd(), 'collections', 'users.json');
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    }
    static async getUserByCurrentToken(token) {
        const users = await this.getUsers();
        const found_user = users.filter(user => user.current_token === token);
        console.log(found_user[0]);
        return found_user[0];
    }
}