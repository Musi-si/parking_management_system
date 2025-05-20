const express = require('express')
const router = express.Router()
const controller = require('../controllers/slot')

/**
 * @swagger
 * components:
 *   schemas:
 *     Slot:
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
 *   name: Slots
 *   description: Manage parking slots
 */

/**
 * @swagger
 * /slots/all:
 *   get:
 *     summary: Get all slots
 *     tags: [Slots]
 *     responses:
 *       200:
 *         description: List of slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Slot'
 */
router.get('/all', controller.get_slots)

/**
 * @swagger
 * /slots/{id}:
 *   get:
 *     summary: Get a specific slot
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: slot details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Slot'
 */
router.get('/get/:id', controller.get_slot)

/**
 * @swagger
 * /parking-slots:
 *   post:
 *     summary: Add a new slot
 *     tags: [Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Slot'
 *     responses:
 *       201:
 *         description: Slot created
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
//  *             $ref: '#/components/schemas/Slot'
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
