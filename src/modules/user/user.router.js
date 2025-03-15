import {Router} from 'express';
import UserModel from '../../../DB/model/user.js';
import jwt from 'jsonwebtoken';
import auth from '../../middelware/auth.js';
import { sendEmail } from '../../utils/SendEmail.js';
import fileUpload from '../../utils/multer.js';
import cloudinary from '../../utils/cloudinary.js';

const router = Router();

router.get('/',auth(),async(req,res)=>{

    const users = await UserModel.findAll({
        attributes:['id','userName','email']
    }
    );
    
    return res.status(200).json({Meassage : "Success" , users});
   
   
});

router.delete('/:id',auth(),async(req,res)=> {
   
        const {id} = req.params;
    
        const user = await UserModel.findByPk(id);
    
        if (user == null){
            return res.status(400).json({Message : "Invalid user"});
        }else{
            UserModel.destroy({
                where : {id:id}
        });
            return res.status(200).json({Message: "success",user})
        }
 
});

// to upload file 
router.put('/:id',fileUpload().single('image'), async(req,res)=>{
 
    const {id}= req.params;
    const user = await UserModel.findByPk(id);
    if (user == null ){
        return res.status(404).json({Message:"user not found"})
    }else{
        const {secure_url} = await cloudinary.uploader.upload(req.file.path);
        user.profilePic = secure_url;
        await user.save();
        return res.status(200).json({Message:"success"});
    }
});

export default router;