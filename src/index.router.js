import { connect } from '../DB/connection.js';
import userRouter from './modules/user/user.router.js';
import authRouter from './modules/authentication/auth.router.js';
import blogRouter from './modules/blog/blog.router.js'
import cors from 'cors';

const  initApp = (app,express)=>{
    
    connect(); 
    app.use(cors());
    app.use(express.json());
    app.use('/users',userRouter);
    app.use('/auth',authRouter);
    app.use('/blogs',blogRouter);

    app.use((err,req,res,next) => {
        return res.status(err.statusCode).json({message:err.message});
    })

}

export default initApp;