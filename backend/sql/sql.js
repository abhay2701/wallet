const mysql = require("mysql");

const mySql = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"rat",
    database:"highlevel",
    connectionLimit:10
});

const handleError = (error, res) => {
    console.log("query error", error);
    return res.status(400).send({
      statusCode: 400,
      message: "Something went wrong!! Please try again.",
      data: error,
    });
  };


// mySql.query(`select * from user`,(err,result,fields)=>{
//     if(err){
//         console.log("err",err);
//     }
//     else{
//         console.log("resss",result);
//     }
// })


class Query {
    async post(query, res) {
      return await new Promise((resolve, reject) => {
        mySql.query(query, async (err, data) => {
          if (err) {
            reject(handleError(err, res));
          } else {
            resolve({
              statusCode: 201,
              message: "Data saved successfully!",
              data,
              isRegistered: true,
            });
          }
        });
      });
    }
  
    async update(query, res) {
      return await new Promise((resolve, reject) => {
        mySql.query(query, async (err, data) => {
          if (err) {
            reject(handleError(err, res));
          } else {
            resolve({
              statusCode: 201,
              message: "Data updated successfully.",
              data,
              isUpdated: true,
            });
          }
        });
      });
    }
  
    async get(query, res) {
      return await new Promise((resolve, reject) => {
        mySql.query(query, async (err, data) => {
          if (err) {
            reject(handleError(err, res));
          } else {
            resolve({
              statusCode: 201,
              message: "Record found successfully.",
              data,
              isFound: data.length,
            });
          }
        });
      });
    }
}

module.exports = new Query();
