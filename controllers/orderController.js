import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//  @desc  Create new order
//  @route POST /api/orders
//  @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    user
  } = req.body

  if (orderItems && orderItems.lenght === 0) {
    res.status(400)
    throw new Error('Brak przedmiotów w zamówieniu')
    return
  } else {
    const order = new Order({
      orderItems,
      // user: req.user._id,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    return res.status(201).json(createdOrder)

  }

})

//  @desc  GET order ID
//  @route GET /api/orders/:id
//  @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Zamówienia nie znaleziono')
  }

})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})

  res.json(orders)
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Nie znaleziono zamówienia')
  }
})


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getOrderByUserId = asyncHandler(async (req, res) => {
  const order = await Order.find({user: req.params.userId})


  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Zamówienia nie znaleziono')
  }

})

export {addOrderItems, getOrderById, getOrders, updateOrderToPaid, getOrderByUserId}