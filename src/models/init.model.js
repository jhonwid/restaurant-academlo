//* Relaciones tablas
const Order = require('./order.model');
const User = require('./user.model');
const Review = require('./review.model');
const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');

const initModel = () => {
    User.hasMany(Order); //? Un (User) puede tener muchas (Order)
    Order.belongsTo(User); //? Una (Order) solo puede pertener un (User)

    User.hasMany(Review); //? Un (User) puede tener muchas (Review) 
    Review.belongsTo(User); //? Una (Review) solo puede pertener un (User)

    Restaurant.hasMany(Review); //? Un (Restaurant) solo puede tener muchas (Review) 
    Review.belongsTo(Restaurant); //? Una (Review) solo puede pertener un (Restaurant)

    Restaurant.hasMany(Meal); //? Un (Restaurant) solo puede tener muchas (Meal) 
    Meal.belongsTo(Restaurant); //? Una (Meal) solo puede pertener un (Restaurant)

    Meal.hasMany(Order); //? Un (Meal) solo puede tener muchas (Order)
    Order.belongsTo(Meal); //? Una (Order) solo puede pertener un (Meal)
};

module.exports = initModel;