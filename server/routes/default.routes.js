// create default route
import express from "express";

const defaultRouter = express.Router();

defaultRouter.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Express DB Api",
  });
});

export default defaultRouter;
