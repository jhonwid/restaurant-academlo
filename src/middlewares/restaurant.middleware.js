const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Restaurant = require('../models/restaurant.model');

exports.existRestaurant = catchAsync(async (req, res, next) => {
    const { id, restaurantId } = req.params;

    const restaurant = await Restaurant.findOne({
        where: {
            status: true,
            id: restaurantId || id,
        },
    });

    if (!restaurant) return next(new AppError(`Restaurant with id: ${restaurantId || id} not found`, 404));

    req.restaurant = restaurant;
    next();
});