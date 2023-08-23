const express = require('express');

//* Controllers 
const orderController = require('./../controllers/order.controller');

//* Middlewares
const authenticationMiddleware = require('./../middlewares/authentication.middleware');
const orderMiddleware = require('./../middlewares/order.middleware');
//const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

//* Routes
router
    .use(authenticationMiddleware.protect)
    .route('/')
    .post(orderController.createOrder)
    .get(orderController.findAllOrders);


router
    .route('/:id')
    .patch(
        orderMiddleware.existOrder,
        orderController.updateOrde)
    .delete(
        orderMiddleware.existOrder,
        orderController.deleteOrder);

module.exports = router;
