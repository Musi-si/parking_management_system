const express = require('express')
const router = express.Router()
const controller = require('../controllers/location')

/**
 * @swagger
 * /locations/all:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get('/all', controller.get_locations)

/**
 * @swagger
 * /locations/add:
 *   post:
 *     summary: Create a new parking location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Location created
 *       400:
 *         description: Validation error
 */
router.post('/add', controller.add_location)

module.exports = router
