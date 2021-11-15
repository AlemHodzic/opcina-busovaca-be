import express from 'express';
import mongoose from 'mongoose';
import ServisModel from '../models/servisModel.js';

export const getServisi = async (req, res, next) => {
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
        const postMessages = await ServisModel.find().sort({ _id: -1 }).limit(limit).skip(skip)
        res.status(200).json(postMessages);
      
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const createServis = async (req, res) => {
    const post = req.body
    let newPost =  new ServisModel(post)
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