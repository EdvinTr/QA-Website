const Joi = require("Joi");

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            privilegeLevel: Joi.string().regex(
                new RegExp('^[1-3]$')
            ),
            username: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{4,32}$")
            ),
            // PW must be between 8-32 character long
            password: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{8,32}$")
            ),
            email: Joi.string().email(),
            firstname: Joi.string().max(32),
            lastname: Joi.string().max(32)
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            switch (error.details[0].context.key) {
                case "privilegeLevel":
                    res.status(400).send({
                        error: "The privilege level must be either 1,2 or 3"
                    })
                    break;
                case "username":
                    res.status(400).send({
                        error: "The username must be between 4 and 32 characters long and not already be in use by another user"
                    })
                    break;
                case "password":
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must ONLY contain the following characters: lower case, upper case, numerics
                        <br>
                        2. It must be at least 8 characters in legnth and not greater than 32 characters in length`
                    })
                    break;
                case "email":
                    res.status(400).send({
                        error: "You must provide a valid email"
                    });
                    break;
                default:
                    res.status(400).send({
                        error: "Invalid registration information"
                    })
            }
        } else {
            next()
        }
    }
}



// privilegeLevel: {
//     type: DataTypes.INTEGER,
//         defaultValue: 1
// },

// username: {
//     type: DataTypes.STRING,
//         unique: true
// },
// password: DataTypes.STRING,

//     email: DataTypes.STRING,

//         firstname: DataTypes.STRING,

//             lastname: DataTypes.STRING,