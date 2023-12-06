import express from "express";
import bodyParser from "body-parser"; 
import db from "./app/models/index.js";
import routes from "./app/routes/routes.js";
import cors from "cors";
import postRoutes from "./app/routes/postsRoute.js";

const app = express();


app.use(cors());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});
routes(app);
postRoutes(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
