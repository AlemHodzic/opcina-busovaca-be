import mongoose from "mongoose";

const servisSchema = mongoose.Schema({
    title: String,
    body: String,
    createdAt: String
})

const ServisMessage = mongoose.model('ServisModel', servisSchema)

export default ServisMessage