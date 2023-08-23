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
exports.createRepairValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name cannot be null'),
    body('address')
        .notEmpty()
        .withMessage('Address cannot be null'),
    body('rating')
        .notEmpty()
        .withMessage('Rating cannot be null'),
    validateFields,
];
