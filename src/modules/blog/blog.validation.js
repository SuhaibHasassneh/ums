import joi from 'joi';

export const createBlogShcema = joi.object({
    
    title:joi.string().min(3).max(10).required(),

    description:joi.string().min(7).required(),
}); 


export const getDetailsSchema = joi.object({
    id:joi.number().min(1).required(),
});

