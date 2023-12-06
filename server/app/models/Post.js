import { DataTypes, Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'Post',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export default Post;
