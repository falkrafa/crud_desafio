import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Por favor, insira um endereço de e-mail válido.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'User'
    });
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'userId' });
  }
}

export default User;
