const catchAsync = require('./../utils/catchAsync');
const Order = require('./../models/order.model');

//* Order Crear
exports.createOrder = catchAsync(async (req, res, next) => {
    const { quantity_order } = req.body;
    const { id } = req.body;

    await Order.create({ quantity_order, mealId: Number(id) });

    return res.status(201).json({
        status: 'success',
        message: 'Order create successfully! 😊',
    });
});

//* Order Encontrar Todas
exports.findAllOrders = catchAsync(async (req, res, next) => {

    const order = await Order.findAll({
        where: {
            status_order: 'active',
        }
    });
    return res.status(200).json({
        status: 'success',
        results: order.length,
        message: 'Meals found successfully! 😊',
        order,
    });

});

//* Order Actualizar
exports.updateOrde = catchAsync(async (req, res, next) => {

    const { order } = req;

    await order.update({ status_order: 'completed' });

    return res.status(201).json({
        status: 'success',
        message: 'Order update successfully! 😊',
    });
});

//* Order Eliminar
exports.deleteOrder = catchAsync(async (req, res, next) => {

    const { order } = req;

    await order.delete({ status_order: 'cancelled' });

    return res.status(200).json({
        status: 'success',
        message: 'User delete successfully! 👌',
    });
});
