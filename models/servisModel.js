import mongoose from "mongoose";
const reqString = {
    type: String,
    required: true
}
const servisSchema = mongoose.Schema({
    title: reqString,   
    titleHR: reqString,
    body: String,
    bodyHR: String,
 

    createdAt: String
})

const ServisMessage = mongoose.model('ServisModel', servisSchema)

export default ServisMessage