const pool = require("../config/db");

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findAllByName() {
    const query = `SELECT * FROM ${this.tableName} ORDER BY ${this.tableName}_name`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findAllByProductSalesCount() {
    const query = `SELECT * FROM ${this.tableName} ORDER BY product_sales_count DESC`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findByColumn(column) {
    const query = `SELECT ${column} FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findById(id, column) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${column} = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results[0];
  }

  async findAllByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async create(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    await this.executeQuery(query, data);
  }

  async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ${this.tableName}_id = ?, ${this.tableName}_name = ? WHERE ${this.tableName}_id = ?`;
    const result = await this.executeQuery(query, [data.id, data.name, id]);
    return result.affectedRows;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE ${this.tableName}_id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }

  async countProductsInCategory(categoryId) {
    const query = `SELECT COUNT(*) AS product_count FROM product WHERE category_id = ?`;
    const result = await this.executeQuery(query, [categoryId]);
    return result[0].product_count;
  }

}

module.exports = BaseSQLModel;
