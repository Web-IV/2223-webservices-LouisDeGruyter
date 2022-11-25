module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
    });
    return User;
}