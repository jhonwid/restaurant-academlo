const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        });
    }

    next();
};

//* Usuario de Login (Email & Password)
exports.LoginValidation = [
    body('emailUser') //* Validacion de Email
        .notEmpty()
        .withMessage('Email cannot be null')
        .isEmail()
        .withMessage('Email must be a correct format'),
    body('passwordUser') //* Validacion de contraseña
        .notEmpty()
        .withMessage('Password cannot be null')
        .isLength({ min: 6 })
        .withMessage('Password must have at least six characters')
        .matches(/\d/)
        .withMessage('Password must have at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one capital letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least on special character (!@#$%^&*(),.?":{}|<>)'),
    validateFields,
];

//* Usuarios creados (Email & Password)
exports.CreateUserValidation = [
    body('nameUser') //* Validacion de name
        .notEmpty()
        .withMessage('Name cannot be null'),
    body('emailUser') //* Validacion de Email
        .notEmpty()
        .withMessage('Email cannot be null')
        .isEmail()
        .withMessage('Email must be a correct format'),
    body('passwordUser') //* Validacion de contraseña
        .notEmpty()
        .withMessage('Password cannot be null')
        .isLength({ min: 6 })
        .withMessage('Password must have at least six characters')
        .matches(/\d/)
        .withMessage('Password must have at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one capital letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least on special character (!@#$%^&*(),.?":{}|<>)'),
    body('roleUser') //* Validacion de role
        .notEmpty()
        .withMessage('Role cannot be null'),
    validateFields,
];

//* Usuarios actualizados
exports.updateUserValidation = [
    body('nameUser')
        .notEmpty()
        .withMessage('name cannot be null'),
    body('emailUser')
        .notEmpty()
        .withMessage('Email cannot be null'),
    validateFields,
];

//* Usuarios eliminados
exports.deleteUserValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('statusUser')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];


//! Restaurante crear
exports.createRestaurantValidation = [
    body('nameRestaurant')
        .notEmpty()
        .withMessage('Name cannot be null'),
    body('addressRestaurant')
        .notEmpty()
        .withMessage('Address cannot be null'),
    body('ratingRestaurant')
        .notEmpty()
        .withMessage('Rating cannot be null'),
    validateFields,
];

//! Restaurante buscar uno
exports.findOneRestaurantValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    validateFields,
];

//! Restaurante actualizar
exports.updateRestaurantValidation = [
    body('nameRestaurant')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('addressRestaurant')
        .notEmpty()
        .withMessage('Address cannot be null'),
    validateFields,
];

//! Restaurante eliminar
exports.deleteRestaurantValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('statusRestaurant')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];

//? Review crear
exports.createReviewValidation = [
    body('commentReview')
        .notEmpty()
        .withMessage('Comment cannot be null'),
    body('ratingReview')
        .notEmpty()
        .withMessage('Rating cannot be null'),
    validateFields,
];

//? Review  actualizar
exports.updateReviewValidation = [
    body('commentReview')
        .notEmpty()
        .withMessage('Comment cannot be null'),
    body('ratingReview')
        .notEmpty()
        .withMessage('rating cannot be null'),
    validateFields,
];

//? Review  eliminar
exports.deleteReviewValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('statusReview')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];

//* Meal crear
exports.createMealValidation = [
    body('name_meal')
        .notEmpty()
        .withMessage('Name cannot be null'),
    body('price_meal')
        .notEmpty()
        .withMessage('Price cannot be null'),
    validateFields,
];

//* Meal buscar uno
exports.findOneMealValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    validateFields,
];

//* Meal actualizar
exports.updateMealValidation = [
    body('name_meal')
        .notEmpty()
        .withMessage('Name cannot be null'),
    body('price_meal')
        .notEmpty()
        .withMessage('Price cannot be null'),
    validateFields,
];

//* Meal eliminar
exports.deleteMealValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('status_meal')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];

//! Order crear
exports.createOrderValidation = [
    body('quantity_order')
        .notEmpty()
        .withMessage('Quantity cannot be null'),
    validateFields,
];

//! Order actualizar
exports.updateOrderValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('status_order')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
    validateFields,
];

//! Order eliminar
exports.deleteOrderValidation = [
    body('id')
        .notEmpty()
        .withMessage('Id cannot be null'),
    body('status_order')
        .notEmpty()
        .withMessage('Status cannot be null'),
    validateFields,
];




