const Review = require('./../models/review.model');
const catchAsync = require('./../utils/catchAsync');

//* Review crear 
exports.createReview = catchAsync(async (req, res, next) => {
    const { commentReview, ratingReview } = req.body;
    const { id } = req.body;
    const uid = req.sessionUser.id;

    await Review.create({ commentReview, ratingReview, restaurantId: Number(id), userId: Number(uid) });

    return res.status(201).json({
        status: 'success',
        message: 'Review create successfully! 😊',
    });
});

//* Review actualizar
exports.updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { commentReview, ratingReview } = req.body;

    await review.update({ commentReview, ratingReview });

    return res.status(200).json({
        status: 'success',
        message: 'Review update successfully! 😊',
    });
});

//* Review eliminar
exports.deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ statusReview: false });

    return res.status(200).json({
        status: 'success',
        message: 'Review delete successfully! 😊',
    });
});