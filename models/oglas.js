import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true
}
const imageObject = {
    name: String,
    file: String
}

const oglasSchema = mongoose.Schema({
    selectedFile: [imageObject],
    title: reqString,
    createdAt: String,
    body: String,
    type: reqString
})

const Oglas = mongoose.model('Oglas', oglasSchema)

export default Oglas