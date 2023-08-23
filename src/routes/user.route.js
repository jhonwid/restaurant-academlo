const express = require('express');

//* Controllers
const userController = require('../controllers/user.controller');

//* Middlewares
const authenticationMiddleware = require('./../middlewares/authentication.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

//* Rutas
router
    .post(
        '/signup',
        validationMiddleware.CreateUserValidation,
        userController.createUser
    );
router
    .post(
        '/login',
        validationMiddleware.LoginValidation,
        userController.login
    );

router.use(authenticationMiddleware.protect);

router
    .use('/:id', userMiddleware.existUser)
    .route('/:id')
    .patch(
        authenticationMiddleware.protectAccountOwner,
        validationMiddleware.updateUserValidation,
        userController.updateUser)
    .delete(
        authenticationMiddleware.protectAccountOwner,
        validationMiddleware.deleteUserValidation,
        userController.deleteUser);

module.exports = router;