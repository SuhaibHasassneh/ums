import jwt from 'jsonwebtoken';

const auth = ()=>{
    return (req,res,next)=>{
       
            const {token} = req.headers;
    
        const decoded = jwt.verify(token,'suhaib');
        
        if(decoded.role != 'admin'){
            return res.status(400).json({Message : "Not Authorized !!!"});
        }
        req.id = decoded.id;
        next();
      
        
    }
}
export default auth;