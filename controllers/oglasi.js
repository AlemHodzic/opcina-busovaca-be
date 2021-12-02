import express from 'express';
import mongoose from 'mongoose';
import Oglas from '../models/oglas.js';

export const getOglasi = async (req, res, next) => {
    let {page, size} = req.query;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 8;
    }
    const limit = parseInt(size)
    const skip = (page-1)*size
    try {
        const postMessages = await Oglas.find().sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const getNabavke = async (req, res) => {
    let {page, size} = req.query;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 8;
    }
    const limit = parseInt(size)
    const skip = (page-1)*size
    try {
        const postMessages = await Oglas.find({type: 'nabavke'}).sort({ _id: -1}).limit(limit).skip(skip)
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}



export const createOglas = async (req, res) => {
    const post = req.body
    let newPost =  new Oglas(post)
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

export const deleteOglas = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await Oglas.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully." });
}

export const getOglas = async (req, res) => {
    const {id: _id} = req.params
    try {
        const post = await Oglas.findById(_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOglasByName = async (req, res) => {
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
        const postMessages = await Oglas.find( { title : { '$regex' : title, '$options' : 'i' } } ).sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}