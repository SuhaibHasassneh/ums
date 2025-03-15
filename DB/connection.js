import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('freedb_umsProject', 'freedb_suhaib@', 'MvzhTj5$qcSXJ76', {
    host: 'sql.freedb.tech',
    port: 3306,
    dialect: 'mysql'
  });

  export const connect = ()=>{
    sequelize.sync().then(()=>{
        console.log("Connetion Successfully with DataBase ");
    }).catch((error)=>{
        console.log("The connection with database is faild !!! :" + error);
    });
  };