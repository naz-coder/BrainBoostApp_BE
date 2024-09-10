const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    // check for token in the authorization header
    const authHeader = req.headers["authorization"];
    let token = null;

    // if the authorization header exists and starts with 'Bearer', extract the token
    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    }else{
        // fall back to checking other places (body, query params)
        token = req.body.token || req.query.token || req.headers["x-access-token"];
    }

    // if token was not found, return an error
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try{
        // veryify the token using the configured secret
        const decoded = jwt.verify(token, config.TOKEN_KEY || process.env.TOKEN_KEY);
        // attach the user details to the request
        req.user = {_id: decoded.user_id || decoded._id, role: decoded.role};
        // console.log("Token decoded", decoded);
    }catch(err){
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;