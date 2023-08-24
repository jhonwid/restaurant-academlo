const express = require('express');

//* Controllers
const restaurantController = require('./../controllers/restaurant.controller');
const reviewController = require('./../controllers/review.controller');

//* Middlewares
const authenticationMiddleware = require('./../middlewares/authentication.middleware');
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const reviewMiddleware = require('./../middlewares/review.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

//* Rutas
router
    .route('/')
    .get(restaurantController.findAllRestaurant)
    .post(
        authenticationMiddleware.protect,
        authenticationMiddleware.restrictTo('admin'),
        validationMiddleware.createRestaurantValidation,
        restaurantController.createRestaurant
    );

router
    .route('/:id')
    .get(
        restaurantMiddleware.existRestaurant,
        validationMiddleware.findOneRestaurantValidation,
        restaurantController.findOneRestaurant
    )
    .patch(
        restaurantMiddleware.existRestaurant,
        authenticationMiddleware.protect,
        authenticationMiddleware.restrictTo('admin'),
        validationMiddleware.updateRestaurantValidation,
        restaurantController.updateRestaurant
    )
    .delete(
        restaurantMiddleware.existRestaurant,
        authenticationMiddleware.protect,
        authenticationMiddleware.restrictTo('admin'),
        validationMiddleware.deleteRestaurantValidation,
        restaurantController.deleteRestaurant
    );

router.use(authenticationMiddleware.protect);

//* Rutas de review
router.post(
    '/reviews/:id',
    restaurantMiddleware.existRestaurant,
    validationMiddleware.createReviewValidation,
    reviewController.createReview
);

router
    .use(
        '/reviews/:restaurantId/:id',
        reviewMiddleware.existReview,
        restaurantMiddleware.existRestaurant
    )
    .route('/reviews/:restaurantId/:id')
    .patch(
        authenticationMiddleware.protectAccountOwner,
        validationMiddleware.updateReviewValidation,
        reviewController.updateReview
    )
    .delete(
        authenticationMiddleware.protectAccountOwner,
        validationMiddleware.deleteReviewValidation,
        reviewController.deleteReview
    );

module.exports = router;