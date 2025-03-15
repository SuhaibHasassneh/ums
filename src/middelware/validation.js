import { AppError } from "../utils/AppError.js";

const validation = (schema)=>{

    return (req,res,next)=>{
      const inputDate = {...req.body, ...req.params};
      const validationResult = schema.validate(inputDate,{abortEarly:false});
      if(validationResult?.error){
        return next(new AppError(validationResult.error,400));
      }
        next();
    }
}
export default validation