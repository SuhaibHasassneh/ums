import {Router} from 'express';
import auth from '../../middelware/auth.js';
import blogeModel from '../../../DB/model/blog.model.js';
import UserModel from '../../../DB/model/user.js';
import { getBlog, getDetailsBlog } from './blog.controler.js';
import { addBlog } from './blog.controler.js';
import { asyncHandler } from '../../utils/catchError.js';
import validation from '../../middelware/validation.js';
import { createBlogShcema, getDetailsSchema } from './blog.validation.js';

const router = Router();

router.get('/',asyncHandler(getBlog));

router.post('/addBlog',auth(),validation(createBlogShcema),asyncHandler(addBlog));

router.get('/:id',validation(getDetailsSchema),asyncHandler(getDetailsBlog));

export default router;