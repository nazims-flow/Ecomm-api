const express = require('express');
const router = express.Router();

const { isLoggedIn, customRole ,} = require('../middlewares/user');

const {createOrder, getOneOrder , getLoggedInOrders , admingetAllorders , adminUpdateOrder , adminDeleteOrder} = require('../controllers/orderController');

// router.route('/order/create').post(isLoggedIn, createOrder); this route is evaluated first   order of the routes actually matters a lot 
// router.route('/order/:id').get(isLoggedIn, getOneOrder);  then this it accepts an id and hence treating myorder as id down is the correct manner
// router.route('/order/myorder').get(isLoggedIn, getLoggedInOrders);
router.route('/order/create').post(isLoggedIn, createOrder);
router.route('/order/:id').get(isLoggedIn, getOneOrder);
router.route('/myorder').get(isLoggedIn, getLoggedInOrders);



//admin routes

router.route('/admin/orders').get(isLoggedIn,customRole("admin"), admingetAllorders);
router
    .route('/admin/order/:id')
    .put(isLoggedIn,customRole("admin"), adminUpdateOrder)
    .delete(isLoggedIn,customRole("admin"), adminDeleteOrder)





module.exports = router;