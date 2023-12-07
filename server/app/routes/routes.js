import users from "../controller/User.js";
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });

router.post("/", upload.single('profilePicture'), users.createUser);

router.get("/", users.findAll);

router.post("/login", users.login);

router.get("/:id", users.findOne);

router.put("/:id", users.update);

router.delete("/:id", users.deleteUser);


export default (app) => {
  app.use('/users', router);
};
