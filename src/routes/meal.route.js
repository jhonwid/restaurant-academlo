const express = require('express');

//* Controllers
const mealController = require('./../controllers/meal.controller');

//* Middlewares
const authenticationMiddleware = require('./../middlewares/authentication.middleware');
const mealMiddleware = require('./../middlewares/meal.middleware');
//const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

//* Rutas
router
    .route('/')
    .get(mealController.findAllMeals);

router
    .route('/:id')
    .post(
        authenticationMiddleware.restrictTo('admin'),
        authenticationMiddleware.protect,
        mealController.createMeal
    )
    .get(mealMiddleware.existMeal, mealController.findOneMeal)
    .patch(
        authenticationMiddleware.restrictTo('admin'),
        authenticationMiddleware.protect,
        mealMiddleware.existMeal,
        mealController.updateMeal
    )
    .delete(
        authenticationMiddleware.restrictTo('admin'),
        authenticationMiddleware.protect,
        mealMiddleware.existMeal,
        mealController.deleleMeal
    );

module.exports = router;