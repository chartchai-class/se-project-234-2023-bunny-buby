const BaseSQLModel = require("./baseSQLModel");

// Create a new class for a specific table
class SalesModel extends BaseSQLModel {
    constructor() {
        super("sales");
    }

    async getSalesId() {
        const results = await this.findByColumn("bill_id");
        console.log(this.tableName);
        return results;
    }
}

const SalesDB = new SalesModel();
module.exports = SalesDB;