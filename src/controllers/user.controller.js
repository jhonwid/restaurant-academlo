const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('./../utils/catchAsync');
const generateJWT = require('./../utils/jwt');

const User = require('../models/user.model');

//* Crear un usuario
exports.createUser = catchAsync(async (req, res, next) => {
    const { nameUser, emailUser, passwordUser, roleUser } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(passwordUser, salt);

    const user = await User.create({
        nameUser: nameUser.toLowerCase(),
        emailUser: emailUser.toLowerCase(),
        passwordUser: encryptedPassword,
        roleUser,
    });

    const token = await generateJWT(user.id);

    res.status(201).json({
        status: 'success',
        message: 'The user has been created succesfully!',
        token,
        where: {
            id: user.id,
            nameUser: user.nameUser,
            emailUser: user.emailUser,
            roleUser: user.roleUser,
        },
    });
});

//* Ingresar a usuario
exports.login = catchAsync(async (req, res, next) => {
    //! Traernos la informacion de la req.body
    const { emailUser, passwordUser } = req.body;

    //!2. Buscar el usuario y revisar si existe
    const user = await User.findOne({
        where: {
            emailUser: emailUser.toLowerCase(),
            status: 'true',
        },
    });

    if (!user) {
        return next(new AppError('The user could not be found', 404));
    }

    //!3. Validar si la contraseña es correcta
    if (!(await bcrypt.compare(passwordUser, user.passwordUser))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    //!4. Generar el jsonwebtoken
    const token = await generateJWT(user.id)

    res.status(200).json({
        status: 'success',
        token,
        user,
    });
});


//* Actualizar un usuario
exports.updateUser = catchAsync(async (req, res, next) => {

    const { user } = req;
    const { nameUser, emailUser } = req.body;

    await user.update({ nameUser, emailUser });

    return res.status(200).json({
        status: 'success',
        message: 'User update successfully! 🤙',
    });
});

//* Eliminar un usuario
exports.deleteUser = catchAsync(async (req, res, next) => {

    const { user } = req;

    await user.delete({ statusUser: false });

    return res.status(200).json({
        status: 'success',
        message: 'User delete successfully! 👌',
    });
});

