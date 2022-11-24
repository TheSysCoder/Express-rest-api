// all mongodb operation services
import UserSchema from "../modules/userSchema.js";

// post the user
export const create_new_user = async (user) => {
  return await UserSchema.create(user);
};

export const get_user_by_email = async (email) => {
  return await UserSchema.findOne(email);
};
