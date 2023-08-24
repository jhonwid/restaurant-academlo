const express = require('express');

//* Controllers
const mealController = require('./../controllers/meal.controller');

//* Middlewares
const authenticationMiddleware = require('./../middlewares/authentication.middleware');
const mealMiddleware = require('./../middlewares/meal.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

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
        validationMiddleware.createMealValidation,
        mealController.createMeal
    )
    .get(mealMiddleware.existMeal, mealController.findOneMeal)
    .patch(
        authenticationMiddleware.restrictTo('admin'),
        authenticationMiddleware.protect,
        mealMiddleware.existMeal,
        validationMiddleware.updateMealValidation,
        mealController.updateMeal
    )
    .delete(
        authenticationMiddleware.restrictTo('admin'),
        authenticationMiddleware.protect,
        mealMiddleware.existMeal,
        validationMiddleware.deleteMealValidation,
        mealController.deleleMeal
    );

module.exports = router;