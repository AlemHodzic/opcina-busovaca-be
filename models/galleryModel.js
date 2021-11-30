import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
    selectedFile: String
})

const Gallery = mongoose.model('Gallery', gallerySchema)

export default Gallery