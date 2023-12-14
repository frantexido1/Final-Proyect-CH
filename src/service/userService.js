const UsersStorage = require("../storage/usersStorage");

class UsersService {
  constructor() {
    this.storage = new UsersStorage();
  }
  async getUsers() {
    return this.storage.getUsers();
  }
  async getUser(value) {
    return this.storage.getUser(value);
  }
  async createUser(user) {
    return this.storage.addUser(user);
  }
  async updateUser(id, user) {
    return this.storage.updateUser(id, user);
  }
  async deleteUser(id) {
    return this.storage.deleteUser(id);
  }
  async deleteInactiveUsers() {
    return this.storage.deleteInactiveUsers();
  }
}
module.exports = UsersService;
