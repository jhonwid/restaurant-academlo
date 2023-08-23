const catchAsync = require('./../utils/catchAsync');
const Meal = require('./../models/meal.model');

//* Meal Encontrar Todos
exports.findAllMeals = catchAsync(async (req, res, next) => {

    const meal = await Meal.findAll({
        where: {
            status: true,
        }
    });
    return res.status(200).json({
        status: 'success',
        results: meal.length,
        message: 'Meals found successfully! 😊',
        meal,
    });
});

//* Meal Crear
exports.createMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
    const { id } = req.body;

    await Meal.create({ name, price, restaurantId: Number(id) });

    return res.status(201).json({
        status: 'success',
        message: 'Meal create successfully! 😊',
    });
});

//* Meal Encontrar Uno
exports.findOneMeal = catchAsync(async (req, res, next) => {

    const { meal } = req;

    return res.status(200).json({
        status: 'success',
        message: 'Meal find successfully! 😊',
        meal,
    });
});

//* Meal Actualizar
exports.updateMeal = catchAsync(async (req, res, next) => {

    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({ name, price });

    return res.status(201).json({
        status: 'success',
        message: 'Meal update successfully! 😊',
    });
});

//* Meal Eliminar
exports.deleleMeal = catchAsync(async (req, res, next) => {

    const { meal } = req;

    await meal.update({ status: false });

    return res.status(200).json({
        status: 'success',
        message: 'Meal delete successfully! 😊',
    });
});