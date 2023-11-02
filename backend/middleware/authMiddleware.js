const jwt = require('jsonwebtoken');

module.exports.authenticate= async(req, res, next)=>{
    // console.log('Landed on auth page');
    const {authorization} = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, "secret");
        const {_id, email, firstname, lastname, role, theme} = decoded;
        req._id= _id;
        req.email = email;
        req.firstname = firstname;
        req.lastname = lastname;
        req.role = role;
        req.theme = theme;
        // console.log("Successfully fetched user information");
        next();
    }catch(err){
        res.status(401).json({message: 'Invalid token'});
    }
}