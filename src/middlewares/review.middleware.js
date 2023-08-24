const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');

exports.existReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Restaurant.findOne({
        where: {
            statusReview: true,
            id,
        },
        include: [
            {
                model: User,
            }
        ]
    });

    if (!review) return next(new AppError(`Restaurant with id: ${id} not found`, 404));

    req.review = review;
    req.user = review.user;
    next();
});
