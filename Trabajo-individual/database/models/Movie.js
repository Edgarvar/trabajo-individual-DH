module.exports = (sequelize, DataType) => {
    var alias = "Movie";
    var cols = {
        title: DataType.STRING,
        release_date: DataType.DATE,
        awards: DataType.INTEGER,
        rating: DataType.INTEGER,
        genre_id: DataType.INTEGER,
        length: DataType.INTEGER,
    };
    var config = {
        tableName: "movies",
        timestamps: false
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models) {
        Movie.belongsTo(models.Genero, {
            as: "genero",
            foreignKey: "genre_id"
        });

        Movie.belongsToMany(models.Actor, {
            as: "actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })
    }


    return Movie;
}              