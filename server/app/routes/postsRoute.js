import posts from "../controller/Post.js";
import express from "express";

const router = express.Router();

router.post("/", posts.createPost);

router.get("/", posts.findAllPosts);

router.get("/:id", posts.findPostById);

router.put("/:id", posts.updatePost);

router.delete("/:id", posts.deletePost);

export default (app) => {
  app.use('/posts', router);
};