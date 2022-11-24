// initialize express app
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import defaultRouter from "./routes/default.routes.js";
mongoose.Promise = global.Promise;
// create express app
const app = express();

// setup dotenv
dotenv.config({
  path: "./configs/.env",
});
app.use(morgan("dev"));
// configure body parser and cors middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect app to DB

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("open", () => {
  console.log("Connected to DB. wating to to start App server . . .");
  app.listen(process.env.API_PORT, (err, res) => {
    if (!err) {
      console.log("Awesome, App server is started.");
    } else {
      console.error(
        "Oops,Something went wrong app server is not started . . ."
      );
    }
  });
});
mongoose.connection.on("error", (err) => {
  console.error("DB COnnection failed . . ." + err);
  process.exit();
});

// call the routers
app.use("/", defaultRouter);
