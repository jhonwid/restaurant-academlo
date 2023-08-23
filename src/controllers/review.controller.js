const Review = require('./../models/review.model');
const catchAsync = require('./../utils/catchAsync');

//* Review crear 
exports.createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { id } = req.body;
    const uid = req.sessionUser.id;

    await Review.create({ comment, rating, restaurantId: Number(id), userId: Number(uid) });

    return res.status(201).json({
        status: 'success',
        message: 'Review create successfully! 😊',
    });
});

//* Review actualizar
exports.updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { comment, rating } = req.body;

    await review.update({ comment, rating });

    return res.status(200).json({
        status: 'success',
        message: 'Review update successfully! 😊',
    });
});

//* Review eliminar
exports.deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: false });

    return res.status(200).json({
        status: 'success',
        message: 'Review delete successfully! 😊',
    });
});