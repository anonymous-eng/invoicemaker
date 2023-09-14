const express = require("express");
const {
  createClient,
  getClientsByUser,
  updateClient,
  deleteClient,
} = require("../controllers/clientControllers");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");

router.route('/').post(protect, createClient);
router.route('/user').get(protect, getClientsByUser);
router.route('/:id').patch(protect, updateClient);
router.route('/:id').delete(protect, deleteClient);

module.exports = router;