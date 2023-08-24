const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Meal = require('./../models/meal.model');

exports.existMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const meal = await Meal.findOne({
        where: {
            status_meal: true,
            id,
        },
    });

    if (!meal) return next(new AppError(`Meal with id: ${id} not found`, 404));

    req.meal = meal;
    next();
});

