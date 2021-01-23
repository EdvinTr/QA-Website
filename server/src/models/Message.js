module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        senderId: DataTypes.INTEGER,
        receiverId: DataTypes.INTEGER,
        subject: DataTypes.STRING,
        textContent: DataTypes.TEXT,

    });
    return Message
}