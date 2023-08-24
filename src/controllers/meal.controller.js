const catchAsync = require('./../utils/catchAsync');
const Meal = require('./../models/meal.model');

//* Meal Crear
exports.createMeal = catchAsync(async (req, res, next) => {
    const { name_meal, price_meal } = req.body;
    const { id, } = req.body;

    await Meal.create({ name_meal, price_meal, restaurantId: Number(id) });

    return res.status(201).json({
        status: 'success',
        message: 'Meal create successfully! 😊',
    });
});

//* Meal Encontrar Uno
exports.findOneMeal = catchAsync(async (req, res, next) => {

    const { meal } = req;

    const { nameRestaurant } = req.body

    await Meal.findOne({ nameRestaurant });

    return res.status(200).json({
        status: 'success',
        message: 'Meal find successfully! 😊',
        meal,
    });
});

//* Meal Encontrar Todos
exports.findAllMeals = catchAsync(async (req, res, next) => {

    const { nameRestaurant } = req.body

    const meal = await Meal.findAll({
        where: {
            status_meal: true,
            nameRestaurant,
        }
    });
    return res.status(200).json({
        status: 'success',
        results: meal.length,
        message: 'Meals found successfully! 😊',
        meal,
    });
});

//* Meal Actualizar
exports.updateMeal = catchAsync(async (req, res, next) => {

    const { meal } = req;
    const { name_meal, price_meal } = req.body;

    await meal.update({ name_meal, price_meal });

    return res.status(201).json({
        status: 'success',
        message: 'Meal update successfully! 😊',
    });
});

//* Meal Eliminar
exports.deleleMeal = catchAsync(async (req, res, next) => {

    const { meal } = req;

    await meal.update({ status_meal: false });

    return res.status(200).json({
        status: 'success',
        message: 'Meal delete successfully! 😊',
    });
});