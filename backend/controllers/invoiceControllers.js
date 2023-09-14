const asyncHandler = require("express-async-handler");
const Invoice = require("../models/InvoiceModel");
const mongoose = require("mongoose");

const createInvoice = asyncHandler(async (req, res) => {
    const invoice = req.body

    const invoiceExists = await Invoice.findOne({ invoiceNumber: invoice.invoiceNumber, creator: invoice.creator });

    if (invoiceExists) {
        res.status(400);
        throw new Error("Invoice Number Already In Use");
    }

    const newInvoice = new Invoice(invoice)

    try {
        await newInvoice.save()
        res.status(201).json(newInvoice)
    } catch (error) {
        res.status(409).json(error.message)
    }
});

const getInvoicesByUser = asyncHandler(async (req, res) => {
    const {search} = req.query;

    try {
        const invoices = await Invoice.find({ creator: search });

        res.status(200).json(invoices);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
});

const getInvoice = asyncHandler(async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await Invoice.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

const deleteInvoice = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await Invoice.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
});

const updateInvoice = asyncHandler(async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const invoiceExists = await Invoice.findOne({ invoiceNumber: invoice.invoiceNumber, creator: invoice.creator, _id: { $ne: _id } });

    if (invoiceExists) {
        res.status(400);
        throw new Error("Invoice Number Already In Use");
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedInvoice)
});

const getTotalCount = asyncHandler(async (req, res) => {
    const {search} = req.query;

    try {
        const totalCount = await Invoice.countDocuments({ creator: search });

        res.status(200).json(totalCount);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
});

module.exports = { createInvoice, getInvoicesByUser, getInvoice, deleteInvoice, updateInvoice, getTotalCount };