const Query = require("../sql/sql");
const moment = require("moment");
class Controller {
  async initializeWallet(req,res){
      console.log("hiiiiiiiiiiiiiiiiiii",req.body);
      let {userName,balance}=req.body; 
      let transactionDate= moment.utc().format("YYYY-MM-DD HH:mm:ss");
      try{
      const sqlQuery =
      `insert into user (name,balance,date )` +
      ` values ('${userName}','${balance}','${transactionDate}')`;

      const userData = await Query.post(sqlQuery, res);
      const walletId=userData.data.insertId;
      if(userData.data.affectedRows>0){
        const sqlTransactionQuery =
        `insert into transactions (walletId,amount,balance,date,type,description )` +
        ` values ('${walletId}','${balance}','${balance}','${transactionDate}','Credit','Wallet initiated')`;
        const result = await Query.post(sqlTransactionQuery, res);
        if(result.data.affectedRows>0){
            res.status(200).send({
              isWalletInstantiated:true,
              userWalletId:walletId,
              currentBalance:balance
            });
        }
      }
    }
    catch(err){
        res.status(400).send({
            error:err
          }); 
    }
     
  }

  async transaction(req,res){
    console.log("11",req.params);
    const walletId=+req.params.id;
    let {amount,description,currentBalance}=req.body;
    let transactionType;
    let transactionDate= moment.utc().format("YYYY-MM-DD HH:mm:ss");
    console.log("1111",Math.sign(amount));
    if(Math.sign(amount) == 1){
      transactionType="Credit";
    }
    else{
      transactionType="Debit";
    }
    console.log("222",currentBalance,"--",amount)
    let balance=Number(currentBalance)+Number(amount);
    console.log("balance is",balance)
    
    const updateQuery=`Update user SET balance=${balance}, date='${transactionDate}' WHERE id=${walletId}`;
    const resultData = await Query.update(updateQuery, res);
    console.log("rrrrr",resultData)
    if(resultData){
      const sqlTransactionQuery =
      `insert into transactions (walletId,amount,balance,date,type,description )` +
      ` values ('${walletId}','${Math.abs(amount)}','${balance}','${transactionDate}','${transactionType}','${description}')`;
      const result = await Query.post(sqlTransactionQuery, res);
      if(result.data.affectedRows>0){
          res.status(200).send({
            isTransactionDone:true,
            userWalletId:walletId,
            currentBalance:balance
          });
      }
    }
    //{ amount: '4555500', description: 'salary', transactionType: 'Credit' }
    console.log("22",req.body);
    
  }

  async getAllTransactions(req,res){
    let {walletId,skip,limit}=req.query;
    console.log("www",skip,limit)
    const getQuery=`Select * from transactions WHERE walletId=${walletId} LIMIT ${skip}, ${limit}`;
    const userData = await Query.get(getQuery, res);
   // console.log("gett",userData);
    res.status(200).send({
      result:userData
    });

  }

  async getWalletData(req,res){
    console.log("rrr",req.params.id);
    const getQuery=`Select * from user WHERE id=${req.params.id}`;
    const userData = await Query.get(getQuery, res);
    console.log("usss",userData);
    res.status(200).send({
      result:userData
    });
  }
}

module.exports = new Controller();
