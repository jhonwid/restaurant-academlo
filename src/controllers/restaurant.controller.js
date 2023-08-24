const catchAsync = require('./../utils/catchAsync');
const Restaurant = require('./../models/restaurant.model');

//* Restaurante buscar todos
exports.findAllRestaurant = catchAsync(async (req, res, next) => {

    const restaurants = await Restaurant.findAll({
        where: {
            status: true,
        },
    });
    return res.status(200).json({
        status: 'success',
        results: restaurants.length,
        message: 'Restaurants found successfully! 😊',
        restaurants,
    });
});

//* Restaurante crear
exports.createRestaurant = catchAsync(async (req, res, next) => {

    const { nameRestaurant, addressRestaurant, ratingRestaurant } = req.body;

    await Restaurant.create({ nameRestaurant, addressRestaurant, ratingRestaurant });

    return res.status(201).json({
        status: 'success',
        message: 'Restaurant create successfully! 😊',
    });
});

//* Restaurante buscar uno
exports.findOneRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    return res.status(200).json({
        status: 'success',
        message: 'Restaurant find successfully! 😊',
        restaurant,
    });
});

//* Restaurante actualizar
exports.updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { nameRestaurant, addressRestaurant } = req.body;

    await restaurant.update({ nameRestaurant, addressRestaurant });

    return res.status(201).json({
        status: 'success',
        message: 'Restaurant update successfully! 😊',
    });
});

//* Restaurante eliminar
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ statusRestaurant: false });

    return res.status(200).json({
        status: 'success',
        message: 'Restaurant delete successfully! 😊',
    });
});
