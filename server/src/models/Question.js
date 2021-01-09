module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        textContent: DataTypes.TEXT,
        category: DataTypes.STRING,
        duplicate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Question
}