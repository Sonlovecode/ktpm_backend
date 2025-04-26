const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true,
    },
    image: {
        type: String,
        requires: true,
    },
    description: {
        type: String,
        requires: true,
    },
    price: {
        type: Number,
        requires: true,
        min: 0,
    },
    priceGoc: {
        type: Number,
        requires: true,
        min: 0,
    },
    quantity: {
        type: Number,
        requires: true,
    },
    discount: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    detailImages: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length === 3;
            },
            message: "Phải có chính xác 3 ảnh chi tiết!"
        },
        required: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema)