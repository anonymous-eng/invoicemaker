const mongoose = require("mongoose");   
const asyncHandler = require("express-async-handler");
const Client = require("../models/ClientModel");

const createClient = asyncHandler( async(req, res) => {

    const client = req.body

    const clientExists = await Client.findOne({ $or: [{ email: client.email }, { phone: client.phone }], userId: client.userId });

    if (clientExists) {
        res.status(400);
        throw new Error("A customer with this email or phone already exists");
    }

    const newClient = new Client({...client, createdAt: new Date().toISOString() });

    try {
        await newClient.save()
        res.status(201).json(newClient)
    } catch (error) {
        res.status(409).json(error.message)
    }
});

const getClientsByUser = asyncHandler(async (req, res) => {
    const { search } = req.query;

    try {
        const clients = await Client.find({ userId: search });

        res.json(clients);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
});

const updateClient = asyncHandler(async (req, res) => {
    const { id: _id } = req.params
    const client = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Customer with that id')

    const clientExists = await Client.findOne({ $or: [{ email: client.email }, { phone: client.phone }], userId: client.userId, _id: { $ne: _id } });

    if (clientExists) {
        res.status(400);
        throw new Error("A customer with this email or phone already exists");
    }

    const updatedClient = await Client.findByIdAndUpdate(_id, {...client, _id}, { new: true})

    res.json(updatedClient)
});

const deleteClient = asyncHandler(async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Customer with that id')

    await Client.findByIdAndRemove(id)

    res.json({message: 'Customer deleted successfully'})
});

module.exports = {createClient, getClientsByUser, updateClient, deleteClient};