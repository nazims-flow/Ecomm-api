const express = require('express');
const router = express.Router()

const { isLoggedIn , customRole} = require('../middlewares/user');

const { testProduct, addProduct, getAllProduct ,adminGetAllProduct , getOneProduct , adminUpdateOneProduct, adminDeleteOneProduct} = require('../controllers/productController');

router.route('/testproduct').get(testProduct);

// user routes
router.route('/products').get(getAllProduct);
router.route('/product/:id').get(getOneProduct);



///admin routes

router.route('/admin/product/add')
        .post(isLoggedIn ,customRole('admin') ,addProduct);


router.route('/admin/products').get(isLoggedIn, customRole('admin') ,adminGetAllProduct);
router.route('/admin/product/:id').put(isLoggedIn, customRole('admin') ,adminUpdateOneProduct);
router.route('/admin/product/:id').delete(isLoggedIn, customRole('admin') ,adminDeleteOneProduct);







module.exports = router ;