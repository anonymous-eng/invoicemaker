const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
const invoiceRoutes = require("./routes/invoiceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const pdfTemplate = require("./documents/index.js");
const pdf = require('html-pdf');
const path = require('path');
const nodemailer = require("nodemailer");
const emailTemplate = require("./documents/email.js");
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/clients", clientRoutes);

const __dirname1 = path.resolve();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.user}`,
        pass: `${process.env.pass}`
    }
});


var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    const { email } = req.body

    // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
       
          // send mail with defined transport object
        transporter.sendMail({
            from: `Invoice Maker`, // sender address
            to: `${email}`, // list of receivers
            replyTo: `${process.env.user}`,
            subject: `Invoice`, // Subject line
            text: `Invoice`, // plain text body
            html: emailTemplate(req.body), // html body
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname1}/invoice.pdf`
            }]
        });
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
     res.sendFile(`${__dirname1}/invoice.pdf`)
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);