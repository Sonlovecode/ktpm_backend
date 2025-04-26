const { hashPassword, comparePassword } = require("../helper/userHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken")
const User = require('../models/userModel');

const registerController = async (req, res) => {
    try {
        const users = await User.find();

        
        const { name, email, password, phone, address, answer } = req.body;
        if (!name) {
            return res.send({ error: 'Hãy nhập tên' })
        };
        if (!email) {
            return res.send({ message: 'Hãy nhập email' })
        }
        if (!password) {
            return res.send({ message: 'Hãy nhập password ' })
        }
        if (!phone) {
            return res.send({ message: 'hãy nhập sdt' })
        }
        if (!address) {
            return res.send({ message: 'Hãy nhập địa chỉ' })
        }
        if (!answer) {
            return res.send({ message: 'Hãy nhập answer' })
        }

        //Kiểm tra  tk tồn tại hay chưa
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            res.status(200).send({
                success: false,
                message: 'Đã đăng kí, vui lòng đăng nhập'
            })
        }

        //mã hóa bcrypt
        const hash = await hashPassword(password)
        const user = await new userModel({
            name,
            email,
            password: hash,
            phone,
            address,
            answer
        }).save();

        res.status(201).send({
            message: 'Đăng kí thành công',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Looi khi đăng kí'
        })
    }
}

//***********************login********************************* */

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                message: 'tài khoản hoặc mật khẩu không hợp lệ',
                error,
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email chưa được đăng ký',
                error: error.message
            });
        }

        const soSanh = await comparePassword(password, user.password);
        if (!soSanh) {
            res.status(404).send({
                success: false,
                message: 'Sai mật khẩu',
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        res.status(200).send({
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi login',
            error: error.message
        })
    }
}

module.exports = { registerController, loginController }