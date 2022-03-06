const express = require('express');
const router = express.Router()

const { isLoggedIn , customRole} = require('../middlewares/user');

const { testProduct, addProduct, getAllProduct} = require('../controllers/productController');

router.route('/testproduct').get(testProduct);

// user routes
router.route('/products').get(getAllProduct);



///admin routes

router.route('/admin/product/add')
        .post(isLoggedIn ,customRole('admin') ,addProduct);








module.exports = router ;