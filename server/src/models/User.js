const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        privilegeLevel: {
            type: DataTypes.STRING,
            defaultValue: "1"
        },

        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,

        email: DataTypes.STRING,

        firstname: DataTypes.STRING,

        lastname: DataTypes.STRING,


    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt)
            },
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

    return User;
}