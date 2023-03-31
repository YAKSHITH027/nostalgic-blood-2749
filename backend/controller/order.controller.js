const { OrderModel } = require('../model/order.model')

const orderAdd = async (req, res) => {
  const payload = req.body
  console.log(payload)
  try {
    const singleOrder = new OrderModel(payload)
    await singleOrder.save()
    res.status(200).send('order has been added')
  } catch (err) {
    res.status(400).send({ err: err.message })
  }
}
const getAllOrders = async (req, res) => {
  const { page, limit } = req.query
  try {
    let allOrders = await OrderModel.find()
      .skip((page - 1 || 0) * limit)
      .limit(limit || 10)
    res.status(200).send(allOrders)
  } catch (error) {
    res.status(400).send({ msg: err.message })
  }
}
const getUserOrder = async (req, res) => {
  try {
    console.log(req.body)
    let allOrders = await OrderModel.find({ userId: req.body.userId })
    res.status(200).send(allOrders)
  } catch (error) {
    res.status(400).send({ msg: err.message })
  }
}

module.exports = { orderAdd, getAllOrders, getUserOrder }
