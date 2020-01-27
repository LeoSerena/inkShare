// db creation
const DBCreate = "CREATE DATABASE inkShareDB"

// tables creation
const table_create = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_name VARCHAR(255))";

//
const user_inserts = "INSERT INTO users (user_name) VALUES ?";
const values = [
    ['Bab'],
    ['Ross'],
    ['Donovan'],
    ['chicko']
]


/*
The result type of a query:
{
  fieldCount: 0,
  affectedRows: 14,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '\'Records:14  Duplicated: 0  Warnings: 0',
  protocol41: true,
  changedRows: 0
}

result.insertedId returns the auto-inserted id if only one row with new id has been inserted
*/