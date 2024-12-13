const categoryModel = require("../models/category.model");

class CategoryRepository {
  constructor() {}

  async getCategories() {
    const categories = categoryModel.find({}, { __v: false });
    return categories;
  }

  async addCategory(data) {
    const checkExisting = await this.getCategorybyName(data.name);
    if (checkExisting)
      throw { statusCode: 400, message: "This category is already exist" };

    const newCategory = new categoryModel(data);
    await newCategory.save();
    return;
  }

  async updateCategory(id, data) {
    const category = await categoryModel.findByIdAndUpdate(id, data);
    if (!category) throw { statusCode: 404, message: "Category not found." };
    return;
  }

  async deleteCategory(id, data) {
    const category = await categoryModel.findByIdAndDelete(id, data);
    if (!category) throw { statusCode: 404, message: "Category not found." };
    return;
  }

  async getCategorybyName(name) {
    const category = await categoryModel.findOne({ name });
    return category;
  }
}

module.exports = CategoryRepository;
