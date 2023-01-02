const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$boy';

const fetchUser = (req, res, next) => {
    // Get user from jwt token and append ID to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate"});
    }

    try {    
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate"});
    }
}

module.exports = fetchUser;