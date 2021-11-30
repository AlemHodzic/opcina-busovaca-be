import mongoose from "mongoose";

const oglasSchema = mongoose.Schema({
    selectedFile: String,
    title: String,
    createdAt: String,
    body: String,
    type: String
})

const Oglas = mongoose.model('Oglas', oglasSchema)

export default Oglas