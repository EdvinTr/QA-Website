

module.exports = (app) => {
    app.get("/register", AuthenicationController.register)
}
