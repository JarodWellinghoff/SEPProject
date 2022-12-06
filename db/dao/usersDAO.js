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
        return users.filter(user => user.currentToken === token);
    }


    // static async injectDB(conn) {
    //     if (users) {
    //         return;
    //     }
    //     try {
    //         users = await conn.db(process.env.ATLUS_NS).collection('users');
    //     } catch (e) {
    //         console.error(
    //             `Unable to establish a collection handle in usersDAO: ${e}`,
    //         );
    //     }
    // }
    // static async addUser(
    //     email,
    //     password,
    //     name,
    //     phone,
    //     address,
    // ) {
    //     try {
    //         const userDoc = {
    //             email: email,
    //             password: password,
    //             name: name,
    //             phone: phone,
    //             address: address,
    //         };
    //         return await users.insertOne(userDoc);
    //     } catch (e) {
    //         console.error(`Unable to post user: ${e}`);
    //         return { error: e };
    //     }
    // }
    // static async getUser(email) {
    //     try {
    //         const pipeline = [
    //             {
    //                 $match: {
    //                     email: email,
    //                 },
    //             },
    //         ];
    //         return await users.aggregate(pipeline).next();
    //     } catch (e) {
    //         console.error(`Something went wrong in getUser: ${e}`);
    //         throw e;
    //     }
    // }
    // static async updateUser(email, userUpdates) {
    //     try {
    //         const updateResponse = await users.updateOne({
    //             email: email,
    //         }, {
    //             $set: userUpdates,
    //         });
    //         return updateResponse;
    //     } catch (e) {
    //         console.error(`Unable to update user: ${e}`);
    //         return { error: e };
    //     }
    // }
    // static async deleteUser(email) {
    //     try {
    //         const deleteResponse = await users.deleteOne({
    //             email: email,
    //         });
    //         return deleteResponse;
    //     } catch (e) {
    //         console.error(`Unable to delete user: ${e}`);
    //         return { error: e };
    //     }
    // }
}