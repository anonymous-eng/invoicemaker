const express = require("express");
const {
  createInvoice,
  getInvoicesByUser,
  getInvoice,
  deleteInvoice,
  updateInvoice,
  getTotalCount,
} = require("../controllers/invoiceControllers");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");

router.route('/count').get(protect, getTotalCount);
router.route('/:id')
      .get(protect, getInvoice)
      .delete(protect, deleteInvoice)
      .patch(protect, updateInvoice);
router.route("/")
    .post(protect, createInvoice)
    .get(protect, getInvoicesByUser);


module.exports = router;