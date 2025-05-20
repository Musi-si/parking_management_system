const express = require('express')
const router = express.Router()
const controller = require('../controllers/vehicle')
const verifyToken = require('../middlewares/auth').verify_token

router.use(verifyToken)

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles for the logged-in user
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vehicles
 */
router.get('/all', controller.getVehicles)

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *             properties:
 *               plateNumber:
 *                 type: string
 *               parkingCode:
 *                 type: string
 *               entryDateTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 */
router.post('/add', controller.addVehicle)

router.get('/report/outgoing', controller.exited)
router.get('/report/entered', controller.entered)
router.post('/entry', controller.carEntry)
router.post('/exit', controller.carExit)


// /**
//  * @swagger
//  * /vehicles/{id}:
//  *   put:
//  *     summary: Update a vehicle
//  *     tags: [Vehicles]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               plateNumber:
//  *                 type: string
//  *               make:
//  *                 type: string
//  *               model:
//  *                 type: string
//  *               color:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Vehicle updated successfully
//  */
// router.put('/:id', controller.updateVehicle)

// /**
//  * @swagger
//  * /vehicles/{id}:
//  *   delete:
//  *     summary: Delete a vehicle
//  *     tags: [Vehicles]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Vehicle deleted successfully
//  */
// router.delete('/:id', controller.deleteVehicle)

// module.exports = router
