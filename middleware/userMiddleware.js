const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');





const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {

    }
}


const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.role !== 1) {
            res.status(401).send({
                message: 'Bạn không có quyền truy cập',
                error: error.message
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Lỗi middleware admin',
            error: error.message
        })
    }
}


module.exports = { requireSignIn, isAdmin };