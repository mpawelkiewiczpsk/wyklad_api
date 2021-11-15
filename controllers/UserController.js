const { sign } = require("jsonwebtoken")

exports.login = (req, res) => {

    const body = req.body;

    if(body.username === 'admin' && body.password === 'admin'){
        const jsontoken = sign({result: {login: 'admin'}}, process.env.JWT_KEY, {
            expiresIn: "120h"
        })
        res.json({
            success: 1,
            message: "Login successfully",
            token: jsontoken
        })
    }else {

        res.json({
            success: 0,
            message: "Invalid username or password"
        })

    }

};

