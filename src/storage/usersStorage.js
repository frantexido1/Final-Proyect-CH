const userModel = require("../models/userModel");
const emailSender = require("../utils/emailSender");

class UsersStorage {
  constructor() {
    this.userModel = userModel;
    this.emailSender = emailSender;
  }
  async getUsers() {
    try {
      const users = await this.userModel.find({}, "name email role");
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  async getUser(value) {
    try {
      let user;
      if (value.includes("@")) {
        user = await this.userModel.findOne(
          { email: value },
          "name email role"
        );
      } else {
        user = await this.userModel.findById(value, "name email role");
      }
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
  async deleteInactiveUsers() {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const inactiveUsers = await this.userModel.find({
        last_connection: { $lt: twoDaysAgo },
      });

      for (const user of inactiveUsers) {
        try {
          await this.emailSender.sendMail({
            to: user.email,
            subject: "Eliminación de cuenta por inactividad",
            html: `<p>Tu cuenta ha sido eliminada debido a la inactividad.</p>`,
            attachments: [],
          });

          await this.userModel.deleteOne({ _id: user._id });
        } catch (error) {
          console.error(
            `Error al enviar correo o eliminar usuario ${user.email}:`,
            error
          );
        }
      }

      return { status: "deleted", inactiveUsers };
    } catch (error) {
      return { status: "Error al eliminar usuarios inactivos:", error };
    }
  }
}
module.exports = UsersStorage;
