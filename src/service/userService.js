const UsersStorage = require("../storage/usersStorage");

class UsersService {
  constructor() {
    this.storage = new UsersStorage();
  }
  async getUsers() {
    return this.storage.getUsers();
  }
  async getUser(param) {
    return this.storage.getUser(param);
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
}
module.exports = UsersService;
