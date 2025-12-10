import NotFoundError from "../errors/not-found-error.js";
import User from "../models/user.js";

const createUser = async (userData) => {
  // userData.password = await hash(userData.password, 10);

  // const user = await User.create(userData);
  // return {
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   createdAt: user.createdAt,
  //   updatedAt: user.updatedAt,
  // };

  const user = await User.create(userData);
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const findAllUsers = async () => {
  const users = await User.find({}, { password: 0 });
  if (!users) {
    throw new NotFoundError(" users not found");
  }
  return users;
};

const findUserById = async (id, res) => {
  const user = await User.findById(id, { password: 0 });
  return user;
};


const updateUserById = async (id, userData) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      ...(userData.name && { name: userData.name }),
      ...(userData.email && { email: userData.email }),
      ...(userData.password && { password: userData.password }),
    },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return { message: "User deleted successfully" };
};

export {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
};