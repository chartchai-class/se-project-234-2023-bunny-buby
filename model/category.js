const BaseSQLModel = require("./baseSQLModel");

// Create a new class for a specific table
class CategoryModel extends BaseSQLModel {
  constructor() {
    super("category"); //table 'products'
  }

  async defineInitialCategories() {
    const results = await this.findAll()
      .then((results) => {
        if (results[0] == undefined) {
          this.setinitialCategories();
        } else {
          console.log("Category", results);
        }
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
      });

    return results;
  }

  async setinitialCategories() {
    const category1 = {
      id: "110",
      name: "All",
    };
    const category2 = {
      id: "111",
      name: "Men",
    };
    const category3 = {
      id: "112",
      name: "Women",
    };
    const category4 = {
      id: "113",
      name: "Kids",
    };
    const category5 = {
      id: "114",
      name: "Accessories",
    };

    const defaultCategories = [
      category1,
      category2,
      category3,
      category4,
      category5,
    ];

    defaultCategories.forEach(async (category) => {
      try {
        await this.create(category);
        console.log("New user created.");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    });
  }

  async getCategoriesId() {
    const results = await this.findByColumn("category_id");
    return results;
  }

  async getCategoriesName() {
    const results = await this.findByColumn("category_name");
    return results;
  }
}

const CategoryDB = new CategoryModel();

module.exports = CategoryDB;
