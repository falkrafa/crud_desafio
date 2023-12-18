import posts from "../controller/Post.js";
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, posts.createPost);

router.get("/", posts.findAllPosts);

router.get("/user/:id", verifyToken, posts.findPostsByUserId);

router.put("/:id", verifyToken,posts.updatePost);

router.delete("/:id", verifyToken,posts.deletePost);

export default (app) => {
  app.use('/posts', router);
};
