import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req, res, next) => {
    let {page, size} = req.query;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 3;
    }
    const limit = parseInt(size)
    const skip = (page-1)*size
    try {
        const postMessages = await PostMessage.find().sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getAllPosts = async (req, res) => {
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
        const postMessages = await PostMessage.find().sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostByName = async (req, res) => {
    const {title: title} = req.params
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
        const postMessages = await PostMessage.find( { title : { '$regex' : title, '$options' : 'i' } } ).sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const getHeadingPosts = async (req, res) => {
    let {page, size} = req.query;
    try {
        const postMessages = await PostMessage.find({isHeader: 1}).sort({ _id: -1}).limit(3)
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostId = async (req, res) => {
    const {id: _id} = req.params
    try {
        const post = await PostMessage.findById(_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    let newPost =  new PostMessage(post)
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    newPost.createdAt = today.toLocaleDateString('bs', options)
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully." });
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that ID');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    res.json(updatedPost);
}

