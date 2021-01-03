const AuthenticationController = require("../src/controllers/AuthenticationController")
const { User } = require("../src/models")

module.exports = (app) => {
    app.post("/register", AuthenticationController.register)

    app.post("/login", AuthenticationController.login)

    app.get("/users", async (req, res) => {
        try {
            const users = await User.findAll();
            res.send(users)
        } catch (err) {
            console.log(err);
        }
    })

}
