const userModel = require("../models/user.model");

class UserRepository {
  constructor() {}

  async register(data) {
    const checkExisting = await this.getUserByEmail(data.email);
    if (checkExisting)
      throw {
        statusCode: 400,
        message: "This email is assigned to another user",
      };
    const newUser = new userModel(data);
    await newUser.save();
    return newUser;
  }

  async login(data) {
    const user = await this.getUserByEmail(data.email);
    if (!user) throw { statusCode: 401, message: "Invalid email or password" };
    const isMatched = await user.comparePasswords(data.password);
    if (!isMatched)
      throw { statusCode: 401, message: "Invalid email or password" };
    return user;
  }

  async profile(data) {
    const user = await this.getUserById(data.id);
    return user;
  }

  async updateProfile(id, data) {
    await userModel.findByIdAndUpdate(id, data);
    return;
  }

  async deleteProfile(id) {
    await userModel.findByIdAndDelete(id);
    return;
  }

  async getUserByEmail(email) {
    const user = await userModel.findOne({ email }, { __v: false });
    return user;
  }

  async getUserById(id) {
    const user = await userModel.findOne(
      { _id: id },
      { __v: false, password: false, _id: false }
    );
    if (!user) throw { statusCode: 404, message: "User not found" };
    return user;
  }
}

module.exports = UserRepository;
