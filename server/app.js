const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const { sequelize } = require("./src/models")
const config = require("./src/config/config");

const app = express()
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cors())

require("../server/src/routes")(app);
// force: true will drop all tables
sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`);
    })