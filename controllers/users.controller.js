import {
  get_all_users,
  create_new_user,
  get_user_by_email,
} from "../services/user.services.js";
import _ from "loadsh";
import bcrypt from "bcrypt";
import e from "express";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await get_all_users();
    if (_.isEmpty(users) === true) {
      res.status(200).json({
        message: "Opps, There is no user availabe",
      });
    } else {
      res.status(200).json({
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// create new user
export const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (!(body.email && body.password)) {
      res.status(400).json({
        error: "please enter email and password.",
      });
    } else {
      const user = req.body;
      //   generate secure password
      console.log();
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const created_user = await create_new_user(user);
      res.status(200).json({
        message: "User is signed up successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// login User
export const loginUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (!(body.email && body.password)) {
      res.status(400).json({
        error: "Please enter username and password",
      });
    } else {
      const user = await get_user_by_email({ email: body.email });
      //   validating user creds
      if (user) {
        const isValidPassword = await bcrypt.compare(
          body.password,
          user.password
        );
        if (isValidPassword) {
          res.status(200).json({
            message: "User logged in",
          });
        } else {
          res.status(400).json({
            error: "Invalid Password, please enter correct password.",
          });
        }
      } else {
        res.status(401).json({
          error: "User is not exists. please sign up.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
