import fs from 'fs';
import path from 'path';

export default class TheatersDAO {
    static async getTheaters() {
        const theatersPath = path.join(process.cwd(), 'collections', 'theaters.json');
        const fileContents = fs.readFileSync
            (theatersPath, 'utf8');
        return JSON.parse(fileContents);
    }

    static async getTheaterByID(id) {
        const theaters = await this.getTheaters();
        return theaters.find(theater => theater.id === id);
    }
}

// import mongodb from 'mongodb';
// const ObjectId = mongodb.ObjectId;
// let theaters;

// export default class TheatersDAO {
    //     static async injectDB(conn) {
    //         if (theaters) {
    //             return;
    //         }
    //         try {
    //             theaters = await conn.db(process.env.ATLUS_NS).collection('theaters');
    //         } catch (e) {
    //             console.error(
    //                 `Unable to establish a collection handle in theatersDAO: ${e}`,
    //             );
    //         }
    //     }
    //     static async getTheaters({
    //         filters = null,
    //         page = 0,
    //         theatersPerPage = 20,
    //     } = {}) {
    //         let query;
    //         if (filters) {
    //             if ('name' in filters) {
    //                 query = { $text: { $search: filters['name'] } };
    //             } else if ('city' in filters) {
    //                 query = { 'city': { $eq: filters['city'] } };
    //             }
    //         }
    //         let cursor;
    //         try {
    //             cursor = await theaters
    //                 .find(query);
    //         } catch (e) {
    //             console.error(`Unable to issue find command, ${e}`);
    //             return { theatersList: [], totalNumTheaters: 0 };
    //         }
    //         const displayCursor = cursor.limit(theatersPerPage).skip(theatersPerPage * page);
    //         try {
    //             const theatersList = await displayCursor.toArray();
    //             const totalNumTheaters = await theaters.countDocuments(query);
    //             return { theatersList, totalNumTheaters };
    //         } catch (e) {
    //             console.error(
    //                 `Unable to convert cursor to array or problem counting documents, ${e}`,
    //             );
    //             return { theatersList: [], totalNumTheaters: 0 };
    //         }
    //     }
    //     static async getTheaterByID(id) {
    //         try {
    //             const pipeline = [
    //                 {
    //                     $match: {
    //                         _id: new ObjectId(id),
    //                     },
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: 'movies',
    //                         let: {
    //                             movie_id: '$movies',
    //                         },
    //                         pipeline: [
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         $in: ['$_id', '$$movie_id'],
    //                                     },
    //                                 },
    //                             },
    //                             {
    //                                 $sort: {
    //                                     title: 1,
    //                                 },
    //                             },
    //                         ],
    //                         as: 'movies',
    //                     },
    //                 },
    //                 {
    //                     $addFields: {
    //                         movies: '$movies',
    //                     },
    //                 },
    //             ];
    //             return await theaters.aggregate(pipeline).next();
    //         } catch (e) {
    //             console.error(`Something went wrong in getTheaterByID: ${e}`);
    //             throw e;
    //         }
    //     }
// }