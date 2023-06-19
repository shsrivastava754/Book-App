const jwt = require('jsonwebtoken');

const verifyToken = (token, secretKey) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded; // Returns the decoded token if it is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      return null; // Returns null if the token is invalid
    }
  }

/**
 * Middleware function that advances user forward only if the token is verified
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const tokenMiddleware = (req,res,next)=>{
    const token = req.query.token || req.body.token;
    const secret_key = process.env.SECRET_KEY;
    
    const decodedToken = verifyToken(token,secret_key);
    
    // Token is verified it means that user is authenticated to access the api's
    if(decodedToken){
        next();
    } else {
        res.status(500).send("Token verification failed");
    }
}


module.exports = tokenMiddleware;