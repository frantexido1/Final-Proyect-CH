const userModel = require("../models/userModel");

class UsersStorage {
  constructor() {
    this.userModel = userModel;
  }
  async getUsers() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  async getUser(param) {
    try {
      const user = await this.userModel.findOne(param);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async createUser(user) {
    try {
      const newUser = await this.userModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(id, body) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) return false;
      const updatedUser = {
        id: user._id,
        name: body.name || user.name,
        lastName: body.lastName || user.lastName,
        age: body.age || user.age,
        email: body.email || user.email,
        password: body.password || user.password,
        role: body.role || user.role,
      };
      Object.assign(user, updatedUser);
      await user.save();
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  }
  async deleteUser(id) {
    try {
      const user = this.userModel.findById(id);
      if (!user) {
        throw new Error("Usuario no existe");
      }
      await this.userModel.deleteOne({ _id: id });
      return { status: "deleted", user };
    } catch (error) {
      return { status: "Error al eliminar el usuario:", user };
    }
  }
}
module.exports = UsersStorage;
