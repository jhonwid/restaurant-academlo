const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/user.model');
const AppError = require('../utils/appError');

//* Existe usuario
exports.existUser = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findOne({
        where: {
            statusUser: true,
            id,
        },
    });

    if (!user)
        return next(new AppError(`User with id: ${id} not found`, 404));

    req.user = user;
    next();
});