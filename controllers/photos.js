import express from 'express';
import mongoose from 'mongoose';
import Gallery from '../models/galleryModel.js';

export const getPhotos = async (req, res, next) => {
    let {page, size} = req.query;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 6;
    }
    const limit = parseInt(size)
    const skip = (page-1)*size
    try {
        const postMessages = await Gallery.find().sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPhoto = async (req, res) => {
    const post = req.body
    let newPost =  new Gallery(post)
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deletePhoto = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await Gallery.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully." });
}

