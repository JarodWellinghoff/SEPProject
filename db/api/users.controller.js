import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
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
        // check if username already exists
        let users = await UsersDAO.getUsers();
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === req.body.user.username) {
                res.status(401).json({ error: "Username already exists" });
                return;
            }
        }
        console.log(req.body.user);
        try {
            let name = req.body.user.name;
            let email = req.body.user.email;
            let password = req.body.user.password;
            let username = req.body.user.username;
            let address = req.body.user.address;
            let phone = req.body.user.phone;
            let admin = req.body.user.admin;
            let new_user = {
                id: UsersController.makeid(40),
                name: name,
                email: email,
                password: password,
                username: username,
                address: address,
                phone: phone,
                admin: admin,
            };
            let user = await UsersDAO.addUser(new_user);
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