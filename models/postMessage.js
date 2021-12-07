import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    titleHR: String,
    subTitle: String,
    subTitleHR: String,
    body: String,
    bodyHR: String,
    tags: [String],
    selectedFile: String,
    createdAt: String,
    isHeader: Number
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage