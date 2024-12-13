const hashedPassword = require("../utils/hash");
const generateToken = require("../utils/jwt");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(data) {
    const hashedPass = await hashedPassword(data.password);
    data.password = hashedPass;
    const newUser = await this.userRepository.register(data);
    return newUser;
  }

  async login(data) {
    const user = await this.userRepository.login(data);
    const token = generateToken(user);
    return token;
  }

  async profile(data) {
    const user = await this.userRepository.profile(data);
    return user;
  }

  async updateProfile(id, data) {
    await this.userRepository.updateProfile(id, data);
    return;
  }

  async deleteProfile(id) {
    await this.userRepository.deleteProfile(id);
    return;
  }
}

module.exports = UserController;
