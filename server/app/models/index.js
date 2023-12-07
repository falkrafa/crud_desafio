// models/index.js
import Sequelize from "sequelize";
import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.js";
import User from "./User.js";
import Post from './Post.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});


const models = [User, Post];

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = User;
db.Posts = Post;

export default db;
