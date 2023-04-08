const userModel = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports= {
    register: async function(req,res){
        let userData = {
            "username": req.body.username,
            "email": req.body.email,
            "password": CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString(),
        }
        try {
            await userModel.create(userData);
            res.redirect('/home');
        } catch (err) {
            res.status(500).send(err);
        }
    },
    login: async function(req, res) {
        try{
            const user = await userModel.findOne({
                username: req.body.username
            });

            !user && res.status(401).json("Wrong User Name");

            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );

            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            const inputPassword = req.body.password;

            originalPassword !== inputPassword &&
                res.status(401).json("Wrong Password");

            // const accessToken = jwt.sign({
            //     id: user._id,
            //     isAdmin: user.isAdmin,
            // },
            // process.env.JWT_SEC,
            //     {expiresIn:"3d"}
            // );

            // const { password, ...others } = user._doc;
            res.redirect('/home');

        } catch(err){
            res.status(500).json(err);
        }
    }
}



