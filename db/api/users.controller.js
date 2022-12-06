import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        try {
            let users = await UsersDAO.getUsers();
            res.json(users);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
    static async apiGetUser(req, res, next) {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let user = await UsersDAO.getUser(email);
            if (user) {
                if (password === user.password) {
                    res.json({ user: user });
                } else {
                    res.status(401).json({ error: "Incorrect password" });
                }
            } else {
                res.status(401).json({ error: "Incorrect email" });
            }
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiAddUser(req, res, next) {
        try {
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;
            let date_of_birth = req.body.date_of_birth;
            let favorite_movies = req.body.favorite_movies;
            let user = await UsersDAO.addUser(
                name,
                email,
                password,
                date_of_birth,
                favorite_movies,
            );
            res.json({ user: user });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            let email = req.body.email;
            let userUpdates = req.body;
            let user = await UsersDAO.updateUser(email, userUpdates);
            res.json({ user: user });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiGetUserByCurrentToken(req, res, next) {
        try {
            let token = req.params.token;
            let user = await UsersDAO.getUserByCurrentToken(token);
            res.json({ user: user });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
}