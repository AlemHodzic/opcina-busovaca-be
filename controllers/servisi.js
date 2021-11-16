import express from 'express';
import mongoose from 'mongoose';
import ServisModel from '../models/servisModel.js';

export const getServisi = async (req, res, next) => {
    let {page, size} = req.query;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 5;
    }
    const limit = parseInt(size)
    const skip = (page-1)*size
    try {
        const postMessages = await ServisModel.find().sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const createServis = async (req, res) => {
    const post = req.body
    let newPost =  new ServisModel(post)
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    const today = new Date();
    newPost.createdAt = today.toLocaleDateString('bs', options)
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getServis = async (req, res) => {
    const {id: _id} = req.params
    try {
        const post = await ServisModel.findById(_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getServisByName = async (req, res) => {
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
        const postMessages = await ServisModel.find( { title : { '$regex' : title, '$options' : 'i' } } ).sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const deleteServis = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await ServisModel.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully." });
}

export const updateServis = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that ID');
    }
    const updatedPost = await ServisModel.findByIdAndUpdate(_id, post, {new: true})
    res.json(updatedPost);
}
