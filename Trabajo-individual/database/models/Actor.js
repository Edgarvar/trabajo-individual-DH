module.exports = (sequelize, DataType) => {
    var alias = "Actor";
    var cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataType.STRING
        },
        last_name: {
            type: DataType.STRING
        },
        rating: {
            type: DataType.INTEGER
        },
        favorite_movie_id: {
            type: DataType.INTEGER
        }
    };
    var config = {
        tableName: "actors",
        timestamps: false
    };

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }

    return Actor;
}