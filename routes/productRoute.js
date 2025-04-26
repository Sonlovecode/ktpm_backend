const express = require('express');
const { createProduct,
    getAllProducts,
    getProductById,
    updateAllProduct,
    deleteProduct,
    searchProduct }
    = require('../controllers/productController');
const router = express.Router();

router.post('/product', createProduct)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.put('/update/products/:id', updateAllProduct)
router.delete('/delete/products/:id', deleteProduct)
router.get('/search/:keyword', searchProduct)
module.exports = router;