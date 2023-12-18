const UsersService = require("../service/userService");

class UsersController {
  constructor() {
    this.userService = new UsersService();
  }
  async getUsers(req, res) {
    try {
      const result = await this.userService.getUsers();
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({
        status: "[CONTROLLER]No se pudo obtener los usuarios correctamente",
        error,
      });
    }
  }
  async getUser(req, res) {
    try {
      const { value } = req.params;
      const result = await this.userService.getUser(value);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({
        status: "[CONTROLLER]No se pudo obtener el usuario correctamente",
        error,
      });
    }
  }
  async updateUser(req, res) {
    try {
      const uid = req.params.uid;
      const body = req.body;
      const result = await this.userService.updateUser(uid, body);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({
        status: "[CONTROLLER]No se pudo modificar el usuario correctamente",
        error,
      });
    }
  }
  async roleUser(req, res) {
    try {
      const uid = req.params.uid;
      const user = await this.userService.getUser({ _id: uid });
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (user.role === "premium") {
        return res.status(400).send("User already premium");
      }
      await this.userService.updateUser(uid, { role: "premium" });
      return res.status(200).send("Role updated");
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      res.status(500).json({
        status: "[CONTROLLER]No se pudo modificar el rol correctamente",
        error,
      });
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.uid;
      const result = await this.userService.deleteUser(id);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({
        status: "[CONTROLLER]No se pudo eliminar el usuario correctamente",
        error,
      });
    }
  }
  async deleteInactiveUsers(req, res) {
    try {
      const result = await this.userService.deleteInactiveUsers();
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error al eliminar los usuarios inactivos:", error);
      res.status(500).json({
        status:
          "[CONTROLLER]No se pudo eliminar los usuarios inactivos correctamente",
        error,
      });
    }
  }
  async adminUsers(req, res) {
    try {
      let users = await this.userService.getUsers();
      users = users.map((user) => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      });
      if (req.user.role === "admin") {
        return res.render("adminUsers", { users: users });
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({
        status: "[CONTROLLER]No se pudo obtener los usuarios correctamente",
        error,
      });
    }
  }
}
module.exports = UsersController;
