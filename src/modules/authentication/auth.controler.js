import bcrypt from "bcryptjs";
import UserModel from "../../../DB/model/user.js";
import { sendEmail } from "../../utils/SendEmail.js";
import jwt from 'jsonwebtoken';
import { AppError } from "../../utils/AppError.js";
export const register = async(req,res)=>{
   

        const {userName,email,password} = req.body;
        const hashedPassword = bcrypt.hashSync(password,8);
        await UserModel.create({userName,email,password:hashedPassword});
        const html = `<div><h2>New User</h2><p>Welcome ${userName}</p></div>`;
        sendEmail(email,"welcome",html);
        return res.status(201).json({Message:"success"});
  
}

export const  login = async(req,res,next)=>{
   
    const {email,password} = req.body;

    const user =await UserModel.findOne({
    where:{email:email}
    });
    if (user == null){
        // return res.status(404).json({Message:"invalid Email"});
        return next(new AppError("invalid Email",404));

    }
    const check = bcrypt.compareSync(password,user.password);
     if (check == false){
        // return res.status(400).json({Message:"Invalid Password"});
        return next(new AppError("invalid Password",400));
    }else{
        const token = jwt.sign({ id:user.id,name:user.userName,role:user.role },'suhaib');
        return res.status(200).json({Message:"Success",token});
    }

} 