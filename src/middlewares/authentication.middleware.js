const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { promisify } = require('util');

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        // res.status(401).json({
        //     status: 'error',
        //     message: 'You are not logged in!, Please log in to get access',
        // });
        return next(
            new AppError('You are not logged in!, Please log in to get access', 401)
        );
    }

    const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_JWT_SEED
    );

    const user = await User.findOne({
        where: {
            id: decoded.id,
            status: 'available',
        },
    });

    if (!user) {
        // res.status(401).json({
        //     status: 'error',
        //     message: 'The owner of this token is not longer available',
        // });        
        return next(
            new AppError('The owner of this token is not longer available', 401)
        );
    }

    //* Se utiliza si tiene funcionalidad de cambiar contraseña
    // if (user.passwordChangedAt) {
    //     const changedTimeStamp = parseInt(
    //         user.passwordChangedAt.getTime() / 1000,
    //         10
    //     );

    //     if (decoded.iat < changedTimeStamp) {
    //         return next(
    //             new AppError('User recently changed password! please login again.', 401)
    //         );
    //     }
    // }

    req.sessionUser = user;
    next();
});

exports.protectAccountOwner = (req, res, next) => {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
        return next(new AppError('You do not own this account.', 401));
    }

    next();
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            // res.status(403).json({
            //     status: 'error',
            //     message: 'You do not have permission to perform this action.',
            // });                
            return next(
                new AppError('You do not have permission to perform this action!', 403)
            );
        }
        next();
    };
};
