module.exports = (sequelize, DataType) => {
    let alias = "Genero";
    let cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
        }
    };
    let config = {
        tableName: "genres",
        timestamps: false
    }

    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = function(models){
        Genero.hasMany(models.Movie, {
            as: "movie",
            foreignKey: "genre_id"
        })
    };

    return Genero;
}