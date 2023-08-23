const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Order = require('./../models/order.model');

exports.existOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({
        where: {
            status: 'active',
            id,
        },
    });

    if (!order) return next(new AppError(`Meal with id: ${id} not found`, 404));

    req.order = order;
    next();
});
