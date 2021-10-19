import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    body: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    isHeader: Number
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage