import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById, getOrders, updateOrderToPaid, getOrderByUserId
} from '../controllers/orderController.js'
import protect  from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/').get(getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/user/:userId').get(protect, getOrderByUserId)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router