import mongoose, { Schema } from "mongoose";

const currencySchema = new Schema({
    name: String,
    code: String,
    country: String
}, { _id: false })

const receiptSchema = new Schema({
    amount: Number,
    discount: Number,
    currency: currencySchema
}, { _id: false })

const DetailsBillSchema = new Schema({
    amount: Number,
    user: String
}, { _id: false })

const billSchema = new Schema({
    iMeet: String,
    createdBy: String,
    reference: String,
    receipt: receiptSchema,
    usersPaid: [DetailsBillSchema]
}, {
    timestamps: true
})

const BillModel = mongoose.models.Bills || mongoose.model("Bills", billSchema)
export default BillModel