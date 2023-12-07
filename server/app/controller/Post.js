import Post from "../models/Post.js";
import Sequelize from "sequelize";
const { Op } = Sequelize;
import User from "../models/User.js";

export const createPost = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const post = {
        content: req.body.content,
        likes: req.body.likes || 0,
        userId: req.body.userId,
    };

    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Post."
            });
        });
};

export const findAllPosts = async (req, res) => {
    try{
        const posts = await Post.findAll({
            include: User,
        });
        res.send(posts);
    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    }
};

export const findPostsByUserId = async (req, res) => {
    const userId = req.params.id;

    try{
        const posts = await Post.findAll({
            where: {
                userId: userId,
            },
            include: User,
        });
        res.send(posts);
    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    }
}


export const updatePost = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};

export const deletePost = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};

const posts = {
    createPost,
    findAllPosts,
    findPostsByUserId,
    updatePost,
    deletePost,
};

export default posts;
