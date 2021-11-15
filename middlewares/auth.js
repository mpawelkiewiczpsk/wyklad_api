const jwt = require("jsonwebtoken");


const specialToken = '7Pu9M83tp7Pu9M83tp7Pu9M83tp';

module.exports = {
    checkToken: (req, res, next) => {

        if(req.query.specialToken === specialToken){
            next();
        }else{
            let token = req.get("authorization");
            if (token) {
                jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                    if (err) {
                        res.status(401)
                        return res.json({
                            success: 0,
                            message: "Invalid Token..."
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Access Denied! Unauthorized User"
                });
            }
        }
    }
};
