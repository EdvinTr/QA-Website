
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
        title: DataTypes.STRING,
        textContent: DataTypes.TEXT,
    })

    const Category = sequelize.define("Category", {
        name: DataTypes.STRING
    })
    Category.hasMany(Question, {
        foreignKey: 'category_id'
    })
    Question.belongsTo(Category, {
        foreignKey: 'category_id'
    })
    return Question
}