const mysql = require("mysql");

global.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
 password : "root",
  database: "api",
  port:"8889"
});

connection.connect((err) => {
  if(err) {
    console.log("Connection error",err);
  }
  else {
    console.log("connected succesfully");
  }
});

module.exports = {
  connection : connection
};
