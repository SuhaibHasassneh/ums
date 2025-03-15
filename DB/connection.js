import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('ums', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export const connect = ()=>{
    sequelize.sync().then(()=>{
        console.log("Connetion Successfully with DataBase ");
    }).catch((error)=>{
        console.log("The connection with database is faild !!! :" + error);
    });
  };