import blogeModel from '../../../DB/model/blog.model.js';
import UserModel from '../../../DB/model/user.js';
import { AppError } from '../../utils/AppError.js';

export const getBlog = async(req,res)=>{
    
    const blogs = await blogeModel.findAll({
        attributes:['id','title'],
        include:{
            model:UserModel,
            attributes:['id','userName'],
        }
    
    });

    return res.status(200).json({Message:"Success",blogs});

}; 

export const addBlog = async(req,res)=>{
    
    const {title,description} = req.body;
    const blog = await blogeModel.create({title,description,UserId:req.id});
    return res.status(200).json({Message:"Success",blog});

}


export const getDetailsBlog = async(req,res,next)=>{
    const {id} = req.params;
    const blog = await blogeModel.findByPk(id);
    if (blog == null){
        return next(new AppError("blog not found!!!",404));
    }else{
    return res.status(200).json({Message:"Success",blog});
        }
   
}

