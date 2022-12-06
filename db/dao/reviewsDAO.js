import fs from 'fs';
import path from 'path';

export default class ReviewsDAO {
    static async getReviews() {
        const reviewsPath = path.join(process.cwd(), 'collections', 'reviews.json');
        const fileContents = fs.readFileSync
            (reviewsPath, 'utf8');
        return JSON.parse(fileContents);
    }

    static async addReview(review) {
        console.log(review);
        const reviews = await this.getReviews();
        reviews.push(review);
        this.persistReviews(reviews);
        return review;
    }

    static async getReviewByUserID(userID) {
        const reviews = await this.getReviews();
        return reviews.filter(review => review.user_id === userID);
    }

    static async persistReviews(reviews) {
        const reviewsPath = path.join(process.cwd(), 'collections', 'reviews.json');
        fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));
    }

}



// import mongodb from 'mongodb';
// const ObjectId = mongodb.ObjectId;
// let reviews;

// export default class ReviewsDAO {
    //     static async injectDB(conn) {
    //         if (reviews) {
    //             return;
    //         }
    //         try {
    //             reviews = await conn.db(process.env.ATLUS_NS).collection('reviews');
    //         } catch (e) {
    //             console.error(
    //                 `Unable to establish a collection handle in reviewsDAO: ${e}`,
    //             );
    //         }
    //     }
    //     static async addReview(
    //         movie_id,
    //         user_id,
    //         review,
    //         date,
    //     ) {
    //         try {
    //             const reviewDoc = {
    //                 movie_id: movie_id,
    //                 user_id: user_id,
    //                 review: review,
    //                 date: date,
    //             };
    //             return await reviews.insertOne(reviewDoc);
    //         } catch (e) {
    //             console.error(`Unable to post review: ${e}`);
    //             return { error: e };
    //         }
    //     }
    //     static async updateReview(reviewId, userId, text, date) {
    //         try {
    //             const updateResponse = await reviews.updateOne(
    //                 {
    //                     user_id: userId,
    //                     _id: ObjectId(reviewId),
    //                 },
    //                 { $set: { text: text, date: date } },
    //             );
    //             return updateResponse;
    //         } catch (e) {
    //             console.error(`Unable to update review: ${e}`);
    //             return { error: e };
    //         }
    //     }
    //     static async deleteReview(reviewId, userId) {
    //         try {
    //             const deleteResponse = await reviews.deleteOne({
    //                 _id: ObjectId(reviewId),
    //                 user_id: userId,
    //             });
    //             return deleteResponse;
    //         } catch (e) {
    //             console.error(`Unable to delete review: ${e}`);
    //             return { error: e };
    //         }
    //     }
    //     static async getReviews({
    //         filters = null,
    //         page = 0,
    //         reviewsPerPage = 20,
    //     } = {}) {
    //         let query;
    //         if (filters) {
    //             if ('name' in filters) {
    //                 query = { $text: { $search: filters['name'] } };
    //             } else if ('movie_id' in filters) {
    //                 query = { 'movie_id': { $eq: filters['movie_id'] } };
    //             }
    //         }
    //         let cursor;
    //         try {
    //             cursor = await reviews
    //                 .find(query);
    //         } catch (e) {
    //             console.error(`Unable to issue find command, ${e}`);
    //             return { reviewsList: [], totalNumReviews: 0 };
    //         }
    //         const displayCursor = cursor.limit(reviewsPerPage).skip(reviewsPerPage * page);
    //         try {
    //             const reviewsList = await displayCursor.toArray();
    //             const totalNumReviews = await reviews.countDocuments(query);
    //             return { reviewsList, totalNumReviews };
    //         } catch (e) {
    //             console.error(
    //                 `Unable to convert cursor to array or problem counting documents, ${e}`,
    //             );
    //             return { reviewsList: [], totalNumReviews: 0 };
    //         }
    //     }
    //     static async getReviewByID(id) {
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
    //                             id: '$_id',
    //                         },
    //                         pipeline: [
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         $in: ['$_id', '$reviews'],
    //                                     },
    //                                 },
    //                             },
    //                             {
    //                                 $project: {
    //                                     title: 1,
    //                                     poster_image: 1,
    //                                 },
    //                             },
    //                         ],
    //                         as: 'movie',
    //                     },
    //                 },
    //                 {
    //                     $addFields: {
    //                         movie: '$movie',
    //                     },
    //                 },
    //             ];
    //             return await reviews.aggregate(pipeline).next();
    //         } catch (e) {
    //             console.error(`Something went wrong in getReviewByID: ${e}`);
    //             throw e;
    //         }
    //     }
// }