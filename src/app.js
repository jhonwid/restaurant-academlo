const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
//const sanitizer = require('perfect-express-sanitizer');

//*Importacion
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
//*Importacion Routes
const userRoutes = require('./routes/user.route');
const restaurantRoutes = require('./routes/restaurant.route');
const mealRoutes = require('./routes/meal.route');
const orderRoutes = require('./routes/order.route');


const app = express();

const limiter = rateLimit({
    max: 100000,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP, please try again in one hour!",
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// app.use(
//     sanitizer.clean({
//         xss: true,
//         noSql: true,
//         sql: false,
//     })
// );

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use("/api/v1", limiter);

//* Rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (req, res, next) => {
    return next(
        new AppError(`Con't find ${req.originalUrl} on this server! 🧨`, 404)
    );
});

app.use(globalErrorHandler),

    module.exports = app;