const express = require('express')
const router = express.Router()
const controller = require('../controllers/parkingSlot')

/**
 * @swagger
 * components:
 *   schemas:
 *     ParkingSlot:
 *       type: object
 *       required:
 *         - code
 *         - size
 *         - pricePerHour
 *         - location
 *       properties:
 *         code:
 *           type: string
 *           description: Unique identifier for the parking slot
 *         size:
 *           type: string
 *           enum: [small, medium, large]
 *           description: Size of the parking slot
 *         status:
 *           type: string
 *           enum: [available, occupied, reserved]
 *           default: available
 *           description: Current status of the parking slot
 *         pricePerHour:
 *           type: number
 *           description: Hourly rate for the parking slot
 *         location:
 *           type: string
 *           description: Location description of the parking slot
 *         assignedVehicle:
 *           type: string
 *           format: uuid
 *           description: ID of the currently assigned vehicle
 */

/**
 * @swagger
 * tags:
 *   name: Parking Slots
 *   description: Manage parking slots
 */

/**
 * @swagger
 * /parking-slots/all:
 *   get:
 *     summary: Get all parking slots
 *     tags: [Parking Slots]
 *     responses:
 *       200:
 *         description: List of parking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSlot'
 */
router.get('/all', controller.get_slots)

/**
 * @swagger
 * /parking-slots/{id}:
 *   get:
 *     summary: Get a specific parking slot
 *     tags: [Parking Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parking slot details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSlot'
 */
router.get('/get/:id', controller.get_slot)

/**
 * @swagger
 * /parking-slots:
 *   post:
 *     summary: Add a new parking slot
 *     tags: [Parking Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingSlot'
 *     responses:
 *       201:
 *         description: Parking slot created
 */
router.post('/add', controller.add_slot)

// /**
//  * @swagger
//  * /parking-slots/{id}:
//  *   patch:
//  *     summary: Change availability or partial update of a parking slot
//  *     tags: [Parking Slots]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 enum: [available, occupied, reserved]
//  *     responses:
//  *       200:
//  *         description: Parking slot updated
//  */
// router.patch('/:id', controller.change_availability)

// /**
//  * @swagger
//  * /parking-slots/{id}:
//  *   put:
//  *     summary: Update a parking slot fully
//  *     tags: [Parking Slots]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ParkingSlot'
//  *     responses:
//  *       200:
//  *         description: Parking slot updated
//  */
// router.put('/:id', controller.update_slot)

// /**
//  * @swagger
//  * /parking-slots/{id}:
//  *   delete:
//  *     summary: Delete a parking slot
//  *     tags: [Parking Slots]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Parking slot deleted
//  */
// router.delete('/:id', controller.delete_slot)

module.exports = router
