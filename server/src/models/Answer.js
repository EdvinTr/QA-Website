module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("Answer", {
        userId: DataTypes.INTEGER,
        questionId: DataTypes.INTEGER,
        textContent: DataTypes.TEXT,
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })
    return Answer
}