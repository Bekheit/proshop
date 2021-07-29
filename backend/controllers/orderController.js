import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//  @desc     Create order
//  @route    POST /api/orders
//  @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems, shippingAddress, paymentMethod, 
    itemsPrice, taxPrice, shippingPrice, totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  const order = new  Order({
    orderItems, shippingAddress, paymentMethod, user: req.user._id,
    itemsPrice, taxPrice, shippingPrice, totalPrice
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

//  @desc     Get order by Id
//  @route    GET /api/orders/:id
//  @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if(!order){
    res.status(404)
    throw new Error('Order not found')
  }
  res.json(order)
})

//  @desc     Update order to paid
//  @route    PUT /api/orders/:id/pay
//  @access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(404)
    throw new Error('Order not found')
  }

  console.log(req.body)

  const { id, status, update_time, payer: {email_address} } = req.body

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = { id, status, update_time, email_address }

  const updatedOrder = await order.save()
  res.json(updatedOrder)
})

//  @desc     Get User orders
//  @route    GET /api/orders/myorders
//  @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
}