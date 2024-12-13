const menuModel = require("../models/menu.model");

class MenuRepository {
  constructor() {}

  async getMenu() {
    const menu = await menuModel.find({}, { __v: false });
    return menu;
  }

  async getItemById(id) {
    const menuItem = await menuModel.findById(id);
    if (!menuItem) throw { statusCode: 404, message: "Item not found." };
    return menuItem;
  }

  async search(data) {
    const { query } = data;

    const page = +data.page || 1;
    const limit = +data.limit || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (query) {
      const normalizedQuery = query
        .normalize("NFD")
        .replace(/[\u064B-\u065F]/g, "");
      filter.name = new RegExp(normalizedQuery, "i");
    } else {
      return [];
    }

    const items = await menuModel
      .find(filter, { _id: false, __v: false })
      .collation({ locale: "ar", strength: 2 })
      .skip(skip)
      .limit(limit);

    if (!items || items.length === 0) {
      throw { statusCode: 404, message: "No menu items found" };
    }

    return items;
  }

  async addItem(data) {
    const newItem = new menuModel(data);
    await newItem.save();
    return newItem;
  }

  async updateItem(id, data) {
    const item = await menuModel.findByIdAndUpdate(id, data);
    if (!item) throw { statusCode: 404, message: "Item not found." };
    return;
  }

  async deleteItem(id) {
    const item = await menuModel.findByIdAndDelete(id);
    if (!item) throw { statusCode: 404, message: "Item not found." };
    return;
  }
}

module.exports = MenuRepository;
