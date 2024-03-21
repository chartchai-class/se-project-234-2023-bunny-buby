const { query } = require("../config/db");
const BaseSQLModel = require("./baseSQLModel");

// Create a new class for a specific table
class ProductsModel extends BaseSQLModel {
  constructor() {
    super("product");
  }

  async getProductsByCategory(id) {
    const results = await this.findById(id, "category_id");
    console.log(this.tableName);
    return results;
  }

  async getCategoryName(id) {
    const query = `SELECT category_name FROM category WHERE category_id = ?`;
    const categoryName = await this.executeQuery(query, [id]);
    const result = categoryName.map((item) => item.category_name);
    return result;
  }

  async findByCategoryId(categoryId) {
    try {
      const query = `SELECT * FROM product WHERE category_id = ? ORDER BY product_sales_count DESC`;
      const results = await this.executeQuery(query, [categoryId]);
      return results;
    } catch (error) {
      throw new Error("Error fetching products by category ID");
    }
  }

  async getTotalProductByCategory(categoryId) {
    const query = `SELECT category_id, COUNT(*) AS total_products 
    FROM product 
    WHERE category_id = ${categoryId} 
    GROUP BY category_id`;
    const totalProducts = await this.executeQuery(query)
    const result = totalProducts.map((item) => item.total_products);
    return result;
  }
}

const ProductsDB = new ProductsModel();
module.exports = ProductsDB;
