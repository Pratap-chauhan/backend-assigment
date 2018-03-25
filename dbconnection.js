const mysql = require("mysql");

global.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "api"
});

connection.connect((err) => {
  if(err) {
    console.log("Connection error");
  }
  else {
    console.log("connected succesfully");
  }
});

module.exports = {
  connection : connection
};
